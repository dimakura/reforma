import axios from 'axios'
import { merge } from 'lodash'
import isPresent from 'reforma/utils/isPresent'

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

export function getAsync(url) {
  // TODO:
}

export function postAsync(url, data) {
  // TODO:
}

export function putAsync(url, data) {
  // TODO:
}

export function deleteAsync(url) {
  // TODO:
}

// @test-only
export function __httpClient__() {
  return httpClient
}
