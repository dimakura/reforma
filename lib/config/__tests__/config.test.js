import { config } from 'reforma'

describe('config', () => {
  afterEach(config.__reset__)

  test('default props', () => {
    expect(config.baseUrl).toBeNull()
    expect(config.httpHeaders).toEqual({})
  })

  test('setBaseUrl', () => {
    config.setBaseUrl('https://myapi.server/api')

    expect(config.baseUrl).toBe('https://myapi.server/api')
  })

  test('setHttpHeader', () => {
    config.setHttpHeader('authorization', 'token')

    expect(config.httpHeaders).toEqual({
      authorization: 'token'
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
  })
})
