// TODO:
// -[ ] addStatusListener
// -[ ] fetch(params) + cancel()

import merge from 'lodash.merge'
import snakeCase from 'lodash.snakecase'

const INITIAL = 'initial'
// const FETCHING = 'fetching'
// const READY = 'ready'
// const FAILED = 'failed'

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
    errors: null
  }

  defineType(collectionDS, opts)
  defineSerialRoot(collectionDS, opts)
  defineUrl(collectionDS, opts)
  defineParams(collectionDS, opts, privateData)
  defineStatus(collectionDS, privateData)
  definedDataAndErrors(collectionDS, privateData)

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

function definedDataAndErrors(collectionDS, privateData) {
  Object.defineProperty(collectionDS, 'data', {
    get: function () {
      return privateData.data
    }
  })

  Object.defineProperty(collectionDS, 'errors', {
    get: function () {
      return privateData.errors
    }
  })
}
