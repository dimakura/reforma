// -- HTTP

const httpData = {
  baseUrl: null,
  headers: {}
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

// -- CONFIG

const config = {}
Object.defineProperty(config, 'http', { value: http })

export default config

export function __cleanupConfig__() {
  httpData.baseUrl = null
  httpData.headers = {}
}
