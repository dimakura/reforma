import qs from 'querystring'

export default function buildUrl(url, params) {
  if (params == null || typeof params !== 'object') {
    return url
  }

  const query = qs.stringify(params)
  return `${url}?${query}`
}
