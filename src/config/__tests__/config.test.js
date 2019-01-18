import { config } from 'reforma'
import { updateClient as updateHttpClient } from 'reforma/api'

describe('config', () => {
  afterEach(config.__reset__)

  test('default props', () => {
    expect(config.baseUrl).toBeNull()
    expect(config.httpHeaders).toEqual({})
  })

  test('setBaseUrl', () => {
    config.setBaseUrl('https://myapi.server/api')

    expect(config.baseUrl).toBe('https://myapi.server/api')
    expect(updateHttpClient).toHaveBeenCalledTimes(1)
    expect(updateHttpClient).toHaveBeenCalledWith({
      baseUrl: 'https://myapi.server/api',
      httpHeaders: {}
    })
  })

  test('setHttpHeader', () => {
    config.setHttpHeader('authorization', 'token')

    expect(config.httpHeaders).toEqual({
      authorization: 'token'
    })
    expect(updateHttpClient).toHaveBeenCalledTimes(1)
    expect(updateHttpClient).toHaveBeenCalledWith({
      baseUrl: null,
      httpHeaders: {
        authorization: 'token'
      }
    })
  })

  test('setHttpHeaders', () => {
    config.setHttpHeaders({
      authorization: 'token',
      application: 'admin'
    })

    expect(config.httpHeaders).toEqual({
      authorization: 'token',
      application: 'admin'
    })
    expect(updateHttpClient).toHaveBeenCalledTimes(1)
    expect(updateHttpClient).toHaveBeenCalledWith({
      baseUrl: null,
      httpHeaders: {
        authorization: 'token',
        application: 'admin'
      }
    })
  })
})
