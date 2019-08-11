import { updateClient as updateHttpClient } from 'reforma/api'

let baseUrl = null
let httpHeaders = {}

function setBaseUrl(url) {
  baseUrl = url

  sendUpdatesToHttpClient()
}

function setHttpHeader(name, value, mute = false) {
  httpHeaders[name] = value

  if (!mute) {
    sendUpdatesToHttpClient()
  }
}

function setHttpHeaders(headers) {
  const props = Object.getOwnPropertyNames(headers)

  for (let i = 0; i < props.length; i++) {
    const name = props[i]
    const value = headers[name]

    setHttpHeader(name, value, true)
  }

  sendUpdatesToHttpClient()
}

function sendUpdatesToHttpClient() {
  updateHttpClient({
    baseUrl,
    httpHeaders
  })
}

const config = {
  get baseUrl() {
    return baseUrl
  },

  get httpHeaders() {
    return httpHeaders
  },

  setBaseUrl,
  setHttpHeader,
  setHttpHeaders,

  reset: function() {
    baseUrl = null
    httpHeaders = {}
    sendUpdatesToHttpClient()
  }
}

export default config
