import qs from 'querystring'
import snakeizeKeys from './snakeizeKeys'

export default function buildUrl(url, params) {
  if (params == null || typeof params !== 'object') {
    return url
  }

  const query = qs.stringify(snakeizeKeys(params))
  return `${url}?${query}`
}
