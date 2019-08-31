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
    prevParams: null,
    data: null,
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

  Object.defineProperty(collectionDS, 'prevParams', {
    get: function () {
      return privateData.prevParams
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
  const originalParams = opts.params

  function cancelIfBusy() {
    const isBusy = privateData.status === FETCHING
    if (isBusy && privateData.controller != null) {
      privateData.controller.abort()
      privateData.controller = null
    }

    return isBusy
  }

  function reportError(error) {
    privateData.status = FAILED
    privateData.controller = null
    privateData.params = privateData.prevParams
    privateData.prevParams = null
    privateData.error = error
    privateData.emitter.emit(STATUS_CHANGED, FETCHING, FAILED)
  }

  async function fetch(params) {
    const isBusy = cancelIfBusy()
    const oldStatus = privateData.status
    privateData.status = FETCHING
    privateData.controller = new AbortController()
    privateData.prevParams = privateData.params
    privateData.params = params
    privateData.error = null

    if (!isBusy) {
      privateData.emitter.emit(STATUS_CHANGED, oldStatus, FETCHING)
    }

    const fullParams = merge({}, originalParams, params)

    try {
      const resp = await Reforma.http.get(collectionDS.url, {
        params: fullParams,
        signal: privateData.controller.signal
      })

      privateData.headers = resp.headers

      if (resp.ok) {
        const data = await resp.json()
        const collectionData = do {
          if (Array.isArray(data)) {
            data
          } else if (
            data != null &&
            collectionDS.serialRoot in data &&
            Array.isArray(data[collectionDS.serialRoot])
          ) {
            data[collectionDS.serialRoot]
          }
        }

        if (collectionData != null) {
          privateData.status = READY
          privateData.data = collectionData.map(data => collectionDS.type.create(data))
        } else {
          privateData.data = []
        }

        privateData.controller = null
        privateData.prevParams = null
        privateData.emitter.emit(STATUS_CHANGED, FETCHING, READY)
      } else {
        const data = await resp.json()
        const err = Reforma.http.failedError(resp.status, resp.statusText, data)
        reportError(err)
      }
    } catch (e) {
      const err = Reforma.http.exceptionError(e)
      reportError(err)
    }
  }

  Object.defineProperty(collectionDS, 'fetch', { value: fetch })

  Object.defineProperty(collectionDS, 'refetch', {
    value: function () {
      return collectionDS.fetch(privateData.params)
    }
  })
}
