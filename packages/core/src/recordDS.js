/* global DOMException */
import Reforma from '@reforma/core'
import AbortController from 'abort-controller'
import EventEmitter from 'events'
import { snakeCase } from './helpers'

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

  const recordDS = {}
  const privateData = {
    status: INITIAL,
    params: null,
    data: null,
    body: null,
    headers: null,
    error: null,
    emitter: new DataSourceEvents()
  }

  defineType(recordDS, opts)
  defineSerialRoot(recordDS, opts)
  defineUrl(recordDS, opts)
  defineParams(recordDS, privateData)
  defineStatus(recordDS, privateData)
  definedDataAndError(recordDS, privateData)
  defineStatusListener(recordDS, privateData)
  defineFetch(recordDS, privateData)

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
    } else {
      snakeCase(recordDS.type.name)
    }
  }

  Object.defineProperty(recordDS, 'serialRoot', {
    value: serialRoot
  })
}

function defineUrl(recordDS, opts) {
  const url = do {
    if ('url' in opts) {
      opts.url
    } else {
      `/${recordDS.serialRoot}`
    }
  }

  Object.defineProperty(recordDS, 'url', {
    value: url
  })
}

function defineParams(recordDS, privateData) {
  Object.defineProperty(recordDS, 'params', {
    get: function () {
      return privateData.params
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

function defineFetch(recordDS, privateData) {
  function reportError(error, wasAborted = false) {
    // We have race condition here!
    // We should not do anything on abort: because this aborted call most likely
    // comes late and another request is under the way.

    if (wasAborted) {
      return
    }

    if (privateData.controller != null) {
      privateData.controller.abort()
      privateData.controller = null
    }

    const oldStatus = privateData.status
    privateData.status = FAILED
    privateData.error = error
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, FAILED)
  }

  function extractData(body) {
    const data = do {
      if (
        body != null &&
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

  function normalizeParams(params) {
    return do {
      if (params != null) {
        if (typeof params === 'object') {
          params
        } else if (
          typeof params === 'number' ||
          typeof params === 'string' ||
          Array.isArray(params)
        ) {
          ({ id: params })
        } else {
          null
        }
      } else {
        null
      }
    }
  }

  async function fetch(params) {
    if (privateData.controller != null) {
      privateData.controller.abort()
    }

    const oldStatus = privateData.status
    privateData.status = BUSY
    privateData.controller = new AbortController()
    privateData.params = normalizeParams(params)
    privateData.error = null
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, BUSY)

    try {
      const resp = await Reforma.http.get(recordDS.url, {
        params: recordDS.params,
        signal: privateData.controller.signal
      })

      privateData.body = await resp.json()
      privateData.headers = resp.headers

      if (resp.ok) {
        privateData.status = READY
        privateData.controller = null
        privateData.data = extractData(privateData.body)
        privateData.emitter.emit(STATUS_CHANGED, BUSY, READY)
      } else {
        reportError(Reforma.http.failedError(resp.status, resp.statusText, privateData.body))
      }
    } catch (e) {
      const abortError = e instanceof DOMException && (e.code === 20 || e.name === 'AbortError')
      reportError(Reforma.http.exceptionError(e), abortError)
    }
  }

  Object.defineProperty(recordDS, 'fetch', { value: fetch })

  Object.defineProperty(recordDS, 'refetch', {
    value: function () {
      return recordDS.fetch(privateData.params)
    }
  })
}
