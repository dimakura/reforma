let baseUrl = null
let httpHeaders = {}

function setBaseUrl(url) {
  baseUrl = url
}

function setHttpHeader(name, value) {
  httpHeaders[name] = value
}

function setHttpHeaders(headers) {
  const props = Object.getOwnPropertyNames(headers)

  for (let i = 0; i < props.length; i++) {
    const name = props[i]
    const value = headers[name]

    setHttpHeader(name, value)
  }
}

const config = {
  setBaseUrl,
  setHttpHeader,
  setHttpHeaders,

  get baseUrl() {
    return baseUrl
  },

  get httpHeaders() {
    return httpHeaders
  },

  __reset__: function() {
    baseUrl = null
    httpHeaders = {}
  }
}

export default config
