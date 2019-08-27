import Reforma from '@reforma/core'
import { isAbsolutePath, joinPaths, getBaseURL, resolvePath } from '../urlHelpers'

describe('url', () => {
  test('isAbsolutePath', () => {
    expect(isAbsolutePath('/test')).toBe(false)
    expect(isAbsolutePath('//move4.ch/test')).toBe(false)
    expect(isAbsolutePath('http://move4.ch/test')).toBe(true)
    expect(isAbsolutePath('https://move4.ch/test')).toBe(true)
  })

  test('joinPaths', () => {
    expect(joinPaths('a', 'b')).toBe('a/b')
    expect(joinPaths('a/', 'b')).toBe('a/b')
    expect(joinPaths('a/', '/b')).toBe('a/b')
    expect(joinPaths('a', '/b')).toBe('a/b')
    expect(joinPaths('', 'b')).toBe('b')
    expect(joinPaths('', '')).toBe('')
    expect(joinPaths()).toBe('')
  })

  test('getBaseURL', () => {
    expect(getBaseURL().href).toBe('https://2fn5i627ppxfy2fg.move4.app/')

    Reforma.config.http.baseUrl = 'http://move4.app/api'
    expect(getBaseURL().href).toBe('http://move4.app/api')

    Reforma.config.http.baseUrl = 'http://move4.app/api?a=1&b=2#hash'
    expect(getBaseURL().href).toBe('http://move4.app/api')
  })

  test('resolvePath', () => {
    expect(resolvePath('/profiles')).toBe('/profiles')
    expect(resolvePath('/profiles/:id', { id: 1 })).toBe('/profiles/1')

    Reforma.config.http.baseUrl = 'https://move4.app/api'
    expect(resolvePath('/profiles')).toBe('https://move4.app/api/profiles')
    expect(resolvePath('/profiles', { firstName: 'Enrico', lastName: 'Fermi' })).toBe('https://move4.app/api/profiles?first_name=Enrico&last_name=Fermi')
    expect(resolvePath('/profiles', { firstName: ['Enrico', 'Albert'] })).toBe('https://move4.app/api/profiles?first_name=Enrico&first_name=Albert')
    expect(resolvePath('/profiles/show/1')).toBe('https://move4.app/api/profiles/show/1')
    expect(resolvePath('/profiles/show/:id', { id: 1 })).toBe('https://move4.app/api/profiles/show/1')
  })
})
