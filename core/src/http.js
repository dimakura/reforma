import Reforma from '@reforma/core'
import merge from 'lodash.merge'
import fetch from 'node-fetch'
import { resolvePath } from './urlHelpers'

export default {
  get: getFn
}

// -- PRIVATE

// [+] GET
// [ ] GET-specs
// [ ] POST
// [ ] POST-specs
// [ ] PUT
// [ ] PUT-specs
// [ ] DELETE
// [ ] DELETE-specs

function getFn(path, params, opts) {
  const url = resolvePath(path, params)
  const signal = opts && opts.signal
  const timeout = (opts && opts.timeout) || Reforma.config.http.timeout
  const headers = merge({}, Reforma.config.http.headers, opts && opts.headers)

  return fetch(url, {
    method: 'GET',
    headers,
    signal,
    timeout
  })
}
