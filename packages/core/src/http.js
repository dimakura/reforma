import Reforma from '@reforma/core'
import { merge } from 'lodash'
import fetch from 'node-fetch'
import { resolvePath } from './urlHelpers'

export default {
  get: getFn,
  post: postFn,
  put: putFn,
  delete: deleteFn,
  exceptionError,
  failedError
}

// -- PRIVATE

function getFn(path, opts) {
  const params = getProp(opts, 'params')
  const signal = getProp(opts, 'signal')
  const timeout = getProp(opts, 'timeout', Reforma.config.http.timeout)
  const url = resolvePath(path, params)
  const headers = merge({}, Reforma.config.http.headers, opts && opts.headers)

  return fetch(url, {
    method: 'GET',
    headers,
    signal,
    timeout
  })
}

function postFn(path, opts) {
  const data = getProp(opts, 'data', {})
  const params = getProp(opts, 'params')
  const signal = getProp(opts, 'signal')
  const timeout = getProp(opts, 'timeout', Reforma.config.http.timeout)
  const url = resolvePath(path, params)
  const headers = merge({}, Reforma.config.http.headers, opts && opts.headers)

  return fetch(url, {
    method: 'POST',
    headers,
    signal,
    timeout,
    body: JSON.stringify(data)
  })
}

function putFn(path, opts) {
  const data = getProp(opts, 'data', {})
  const params = getProp(opts, 'params')
  const signal = getProp(opts, 'signal')
  const timeout = getProp(opts, 'timeout', Reforma.config.http.timeout)
  const url = resolvePath(path, params)
  const headers = merge({}, Reforma.config.http.headers, opts && opts.headers)

  return fetch(url, {
    method: 'PUT',
    headers,
    signal,
    timeout,
    body: JSON.stringify(data)
  })
}

function deleteFn(path, opts) {
  const params = getProp(opts, 'params')
  const signal = getProp(opts, 'signal')
  const timeout = getProp(opts, 'timeout', Reforma.config.http.timeout)
  const url = resolvePath(path, params)
  const headers = merge({}, Reforma.config.http.headers, opts && opts.headers)

  return fetch(url, {
    method: 'DELETE',
    headers,
    signal,
    timeout
  })
}

function getProp(obj, prop, defaultValue = null) {
  return do {
    if (obj == null) {
      defaultValue
    } else if (prop in obj) {
      obj[prop]
    } else {
      defaultValue
    }
  }
}

function exceptionError(ex) {
  return createError({
    __isException__: true,
    exception: ex
  })
}

function failedError(status, statusText, body) {
  return createError({
    __isBadResponse__: true,
    status,
    statusText,
    body
  })
}

function createError(data) {
  const error = {}

  const names = Object.getOwnPropertyNames(data)
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    Object.defineProperty(error, name, { value: data[name] })
  }

  Object.defineProperty(error, '__isError__', { value: true })

  return error
}
