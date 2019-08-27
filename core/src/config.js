// -- HTTP

const httpData = {
  baseUrl: null,
  headers: {},
  timeout: 10000
}

const http = {}

Object.defineProperty(http, 'baseUrl', {
  get: function () {
    return httpData.baseUrl
  },

  set: function (newValue) {
    httpData.baseUrl = newValue
  }
})

Object.defineProperty(http, 'headers', {
  get: function () {
    return httpData.headers
  }
})

Object.defineProperty(http, 'setHeader', {
  value: function (name, value) {
    httpData.headers[name] = value
  }
})

Object.defineProperty(http, 'timeout', {
  get: function () {
    return httpData.timeout
  },

  set: function (newValue) {
    httpData.timeout = newValue
  }
})

// -- CONFIG

const config = {}
Object.defineProperty(config, 'http', { value: http })

export default config

export function __cleanupConfig__() {
  httpData.baseUrl = null
  httpData.headers = {}
}
