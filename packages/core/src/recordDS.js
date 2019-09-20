/* global DOMException */
import Reforma from '@reforma/core'
import AbortController from 'abort-controller'
import EventEmitter from 'events'
import { serializeType } from './serialize'

const INITIAL = 'initial'
const BUSY = 'busy'
const READY = 'ready'
const FAILED = 'failed'

const STATUS_CHANGED = 'status-changed'
class DataSourceEvents extends EventEmitter {}

export default function createRecordDS(opts) {
  if (opts == null || typeof opts !== 'object') {
    throw new Error(`Wrong set of options for createRecordDS: ${opts}`)
  }

  if (opts.url == null) {
    throw new Error('Specify url when creating record data source')
  }

  const recordDS = {}
  const privateData = {
    status: INITIAL,
    id: null,
    data: null,
    body: null,
    headers: null,
    error: null,
    emitter: new DataSourceEvents()
  }

  defineType(recordDS, opts)
  defineSerialRoot(recordDS, opts)
  defineUrl(recordDS, opts)
  defineId(recordDS, privateData)
  defineStatus(recordDS, privateData)
  definedDataAndError(recordDS, privateData)
  defineStatusListener(recordDS, privateData)
  defineRequestMethods(recordDS, privateData)

  return recordDS
}

// -- PRIVATE

function defineType(recordDS, opts) {
  const type = opts.type
  if (type == null || !type.__isUserDefinedType__) {
    throw new Error(`Wrong datasource type: ${type}`)
  }

  Object.defineProperty(recordDS, 'type', {
    value: opts.type
  })

  Object.defineProperty(recordDS, '__isRecordDS__', {
    value: true
  })
}

function defineSerialRoot(recordDS, opts) {
  const serialRoot = do {
    if ('serialRoot' in opts) {
      opts.serialRoot
    }
  }

  Object.defineProperty(recordDS, 'serialRoot', {
    value: serialRoot
  })
}

function defineUrl(recordDS, opts) {
  const url = opts.url
  const recordUrl = do {
    if ('recordUrl' in opts) {
      opts.recordUrl
    } else {
      `${url}/:id`
    }
  }

  Object.defineProperty(recordDS, 'url', { value: url })
  Object.defineProperty(recordDS, 'recordUrl', { value: recordUrl })
}

function defineId(recordDS, privateData) {
  Object.defineProperty(recordDS, 'id', {
    get: function () {
      return privateData.id
    }
  })
}

function defineStatus(recordDS, privateData) {
  Object.defineProperty(recordDS, 'status', {
    get: function () {
      return privateData.status
    }
  })
}

function definedDataAndError(recordDS, privateData) {
  Object.defineProperty(recordDS, 'data', {
    get: function () {
      return privateData.data
    }
  })

  Object.defineProperty(recordDS, 'body', {
    get: function () {
      return privateData.body
    }
  })

  Object.defineProperty(recordDS, 'headers', {
    get: function () {
      return privateData.headers
    }
  })

  Object.defineProperty(recordDS, 'error', {
    get: function () {
      return privateData.error
    }
  })
}

function defineStatusListener(recordDS, privateData) {
  function addStatusListener(handler) {
    privateData.emitter.on(STATUS_CHANGED, handler)

    return function () {
      privateData.emitter.removeListener(STATUS_CHANGED, handler)
    }
  }

  Object.defineProperty(recordDS, 'addStatusListener', {
    value: addStatusListener
  })
}

function defineRequestMethods(recordDS, privateData) {
  function reportError(error) {
    const oldStatus = privateData.status

    abortAnyPendingRequest()
    privateData.status = FAILED
    privateData.error = error
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, FAILED)
  }

  function reportException(ex) {
    // We have race condition here!
    // We should not do anything on abort: because this aborted call most likely
    // comes late and another request is under the way.
    const abortError = ex instanceof DOMException && (ex.code === 20 || ex.name === 'AbortError')
    if (!abortError) {
      const err = Reforma.http.exceptionError(ex)
      reportError(err)
    }
  }

  function extractData(body) {
    const data = do {
      if (
        body != null &&
        recordDS.serialRoot != null &&
        recordDS.serialRoot in body
      ) {
        body[recordDS.serialRoot]
      } else {
        body
      }
    }

    return do {
      if (data != null) {
        recordDS.type.create(data)
      } else {
        null
      }
    }
  }

  function abortAnyPendingRequest() {
    if (privateData.controller != null) {
      privateData.controller.abort()
      privateData.controller = null
    }
  }

  function resetPrivateData() {
    privateData.status = INITIAL
    privateData.id = null
    privateData.data = null
    privateData.body = null
    privateData.headers = null
    privateData.error = null
  }

  async function processResponse(resp, parseData = true) {
    privateData.body = await resp.json()
    privateData.headers = resp.headers

    if (resp.ok) {
      privateData.status = READY
      privateData.controller = null
      privateData.data = do {
        if (parseData) {
          extractData(privateData.body)
        } else {
          null
        }
      }
      privateData.emitter.emit(STATUS_CHANGED, BUSY, READY)
    } else {
      const err = Reforma.http.failedError(resp.status, resp.statusText, privateData.body)
      reportError(err)
    }
  }

  async function fetch(id) {
    const oldStatus = privateData.status

    abortAnyPendingRequest()
    privateData.status = BUSY
    privateData.controller = new AbortController()
    privateData.id = id
    privateData.error = null
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, BUSY)

    try {
      const resp = await Reforma.http.get(recordDS.recordUrl, {
        params: { id: recordDS.id },
        signal: privateData.controller.signal
      })

      await processResponse(resp)
    } catch (ex) {
      reportException(ex)
    }
  }

  function reset() {
    const oldStatus = privateData.status

    if (oldStatus !== INITIAL) {
      abortAnyPendingRequest()
      resetPrivateData()
      privateData.emitter.emit(STATUS_CHANGED, oldStatus, INITIAL)
    }
  }

  async function create(data, fields) {
    const oldStatus = privateData.status

    abortAnyPendingRequest()
    resetPrivateData()
    privateData.status = BUSY
    privateData.controller = new AbortController()
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, BUSY)

    try {
      const resp = await Reforma.http.post(recordDS.url, {
        data: serializeType(recordDS.type, data, fields),
        signal: privateData.controller.signal
      })

      await processResponse(resp)
    } catch (ex) {
      reportException(ex)
    }
  }

  async function update(id, data, fields) {
    const oldStatus = privateData.status

    abortAnyPendingRequest()
    privateData.status = BUSY
    privateData.controller = new AbortController()
    privateData.id = id
    privateData.error = null
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, BUSY)

    try {
      const resp = await Reforma.http.put(recordDS.recordUrl, {
        params: { id: recordDS.id },
        data: serializeType(recordDS.type, data, fields),
        signal: privateData.controller.signal
      })

      await processResponse(resp)
    } catch (ex) {
      reportException(ex)
    }
  }

  async function deleteFn(id) {
    const oldStatus = privateData.status

    abortAnyPendingRequest()
    privateData.status = BUSY
    privateData.controller = new AbortController()
    privateData.id = id
    privateData.error = null
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, BUSY)

    try {
      const resp = await Reforma.http.delete(recordDS.recordUrl, {
        params: { id: recordDS.id },
        signal: privateData.controller.signal
      })

      await processResponse(resp, false)
    } catch (ex) {
      reportException(ex)
    }
  }

  Object.defineProperty(recordDS, 'fetch', { value: fetch })
  Object.defineProperty(recordDS, 'reset', { value: reset })
  Object.defineProperty(recordDS, 'create', { value: create })
  Object.defineProperty(recordDS, 'update', { value: update })
  Object.defineProperty(recordDS, 'delete', { value: deleteFn })
  Object.defineProperty(recordDS, 'refetch', {
    value: function () {
      return recordDS.fetch(privateData.id)
    }
  })
}
