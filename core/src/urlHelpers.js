import Reforma from '@reforma/core'
import snakeCase from 'lodash.snakecase'
const URL = global.URL || require('url').URL

const absoluteUrlRegex = /^https?:\/\//i
const pathSeparator = '/'
const defaultHost = 'https://2fn5i627ppxfy2fg.move4.app'

export function isAbsolutePath(path) {
  return absoluteUrlRegex.test(path)
}

export function joinPaths(path1, path2) {
  path1 = do {
    if (path1 == null) {
      ''
    } else if (path1.charAt(path1.length - 1) === pathSeparator) {
      path1.substring(0, path1.length - 1)
    } else {
      path1
    }
  }

  path2 = do {
    if (path2 == null) {
      ''
    } else if (path2.charAt(0) === pathSeparator) {
      path2.substring(1)
    } else {
      path2
    }
  }

  return [path1, path2].filter(p => !!p).join(pathSeparator)
}

export function getBaseURL() {
  const base = do {
    const baseUrl = Reforma.config.http.baseUrl
    if (baseUrl == null) {
      new URL(defaultHost)
    } else {
      new URL(baseUrl, defaultHost)
    }
  }

  base.search = ''
  base.hash = ''

  return base
}

export function resolvePath(path, params) {
  const url = do {
    if (path == null) {
      resolvePath('/')
    } else if (isAbsolutePath(path)) {
      new URL(path)
    } else {
      const url = getBaseURL()
      url.pathname = joinPaths(url.pathname, path)
      url
    }
  }

  if (params != null && typeof params === 'object') {
    const names = Object.getOwnPropertyNames(params)
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const paramName = snakeCase(name)
      const value = params[name]

      if (url.pathname.indexOf(`:${paramName}`) !== -1) {
        url.pathname = url.pathname.replace(`:${paramName}`, value)
      } else if (Array.isArray(value)) {
        for (let j = 0; j < value.length; j++) {
          url.searchParams.append(paramName, value[j])
        }
      } else {
        url.searchParams.append(paramName, value)
      }
    }
  }

  return do {
    if (url.origin === defaultHost) {
      `${url.pathname}${url.search}`
    } else {
      url.href
    }
  }
}
