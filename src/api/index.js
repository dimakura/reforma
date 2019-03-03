import axios from 'axios'
import { merge } from 'lodash'
import isPresent from 'reforma/utils/isPresent'
import camelizeKeys from 'reforma/utils/camelizeKeys'
import snakeizeKeys from 'reforma/utils/snakeizeKeys'
import notBlank from 'reforma/utils/notBlank'
import createApiResponse from './ApiResponse'

const defaultConfig = {
  timeout: 10000
}

let httpClient
updateClient()

export function updateClient(appConfig) {
  const config = {}

  if (appConfig != null) {
    if (isPresent(appConfig.baseUrl)) {
      config.baseURL = appConfig.baseUrl
    }

    if (isPresent(appConfig.httpHeaders)) {
      config.headers = appConfig.httpHeaders
    }
  }

  httpClient = axios.create(merge({}, defaultConfig, config))
}

export async function getAsync(url) {
  try {
    const resp = await httpClient.get(url)
    return prepareResponse(null, resp)
  } catch(ex) {
    return prepareResponse(ex)
  }
}

export async function postAsync(url, data) {
  try {
    data = prepareRequest(data)
    const resp = await httpClient.post(url, data)

    return prepareResponse(null, resp)
  } catch(ex) {
    return prepareResponse(ex)
  }
}

export async function putAsync(url, data) {
  try {
    data = prepareRequest(data)
    const resp = await httpClient.put(url, data)

    return prepareResponse(null, resp)
  } catch(ex) {
    return prepareResponse(ex)
  }
}

export async function deleteAsync(url) {
  try {
    const resp = await httpClient.delete(url)
    return prepareResponse(null, resp)
  } catch(ex) {
    return prepareResponse(ex)
  }
}

// @test-only
export function __httpClient__() {
  return httpClient
}

// -- PRIVATE

function prepareRequest(data) {
  return do {
    if (data instanceof FormData) {
      data
    } else {
      snakeizeKeys(data)
    }
  }
}

function prepareResponse(ex, resp) {
  if (ex != null && ex.response == null) {
    return createApiResponse(ex)
  } else {
    resp = notBlank(resp, ex && ex.response)
    return createApiResponse(resp)
  }
}
