/* global DOMException */
import Reforma from '@reforma/core'
import AbortController from 'abort-controller'
import EventEmitter from 'events'
import merge from 'lodash.merge'
import { snakeCase } from './helpers'

const INITIAL = 'initial'
const FETCHING = 'fetching'
const READY = 'ready'
const FAILED = 'failed'

const STATUS_CHANGED = 'status-changed'
class DataSourceEvents extends EventEmitter {}

export default function createCollectionDS(opts) {
  if (opts == null || typeof opts !== 'object') {
    throw new Error(`Wrong set of options for createCollectionDS: ${opts}`)
  }

  const collectionDS = {}
  const privateData = {
    status: INITIAL,
    params: null,
    data: null,
    body: null,
    headers: null,
    error: null,
    emitter: new DataSourceEvents()
  }

  defineType(collectionDS, opts)
  defineSerialRoot(collectionDS, opts)
  defineUrl(collectionDS, opts)
  defineParams(collectionDS, opts, privateData)
  defineStatus(collectionDS, privateData)
  definedDataAndError(collectionDS, privateData)
  defineStatusListener(collectionDS, privateData)
  defineFetch(collectionDS, opts, privateData)

  return collectionDS
}

// -- PRIVATE

function defineType(collectionDS, opts) {
  const type = opts.type
  if (type == null || !type.__isUserDefinedType__) {
    throw new Error(`Wrong datasource type: ${type}`)
  }

  Object.defineProperty(collectionDS, 'type', {
    value: opts.type
  })

  Object.defineProperty(collectionDS, '__isCollectionDS__', {
    value: true
  })
}

function defineSerialRoot(collectionDS, opts) {
  const serialRoot = do {
    if ('serialRoot' in opts) {
      opts.serialRoot
    } else {
      snakeCase(collectionDS.type.name)
    }
  }

  Object.defineProperty(collectionDS, 'serialRoot', {
    value: serialRoot
  })
}

function defineUrl(collectionDS, opts) {
  const url = do {
    if ('url' in opts) {
      opts.url
    } else {
      `/${collectionDS.serialRoot}`
    }
  }

  Object.defineProperty(collectionDS, 'url', {
    value: url
  })
}

function defineParams(collectionDS, opts, privateData) {
  const originalParams = opts.params

  Object.defineProperty(collectionDS, 'params', {
    get: function () {
      return merge({}, originalParams, privateData.params)
    }
  })
}

function defineStatus(collectionDS, privateData) {
  Object.defineProperty(collectionDS, 'status', {
    get: function () {
      return privateData.status
    }
  })
}

function definedDataAndError(collectionDS, privateData) {
  Object.defineProperty(collectionDS, 'data', {
    get: function () {
      return privateData.data
    }
  })

  Object.defineProperty(collectionDS, 'body', {
    get: function () {
      return privateData.body
    }
  })

  Object.defineProperty(collectionDS, 'headers', {
    get: function () {
      return privateData.headers
    }
  })

  Object.defineProperty(collectionDS, 'error', {
    get: function () {
      return privateData.error
    }
  })
}

function defineStatusListener(collectionDS, privateData) {
  function addStatusListener(handler) {
    privateData.emitter.on(STATUS_CHANGED, handler)

    return function () {
      privateData.emitter.removeListener(STATUS_CHANGED, handler)
    }
  }

  Object.defineProperty(collectionDS, 'addStatusListener', {
    value: addStatusListener
  })
}

function defineFetch(collectionDS, opts, privateData) {
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
      if (Array.isArray(body)) {
        body
      } else if (
        body != null &&
        collectionDS.serialRoot in body &&
        Array.isArray(body[collectionDS.serialRoot])
      ) {
        body[collectionDS.serialRoot]
      }
    }

    return do {
      if (data != null) {
        data.map(data => collectionDS.type.create(data))
      } else {
        []
      }
    }
  }

  async function fetch(params) {
    if (privateData.controller != null) {
      privateData.controller.abort()
    }

    const oldStatus = privateData.status
    privateData.status = FETCHING
    privateData.controller = new AbortController()
    privateData.params = params
    privateData.error = null
    privateData.emitter.emit(STATUS_CHANGED, oldStatus, FETCHING)

    try {
      const resp = await Reforma.http.get(collectionDS.url, {
        params: collectionDS.params,
        signal: privateData.controller.signal
      })

      privateData.body = await resp.json()
      privateData.headers = resp.headers

      if (resp.ok) {
        privateData.status = READY
        privateData.controller = null
        privateData.data = extractData(privateData.body)
        privateData.emitter.emit(STATUS_CHANGED, FETCHING, READY)
      } else {
        reportError(Reforma.http.failedError(resp.status, resp.statusText, privateData.body))
      }
    } catch (e) {
      const abortError = e instanceof DOMException && (e.code === 20 || e.name === 'AbortError')
      reportError(Reforma.http.exceptionError(e), abortError)
    }
  }

  Object.defineProperty(collectionDS, 'fetch', { value: fetch })

  Object.defineProperty(collectionDS, 'refetch', {
    value: function () {
      return collectionDS.fetch(privateData.params)
    }
  })
}
