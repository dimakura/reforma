import { Config } from 'reforma'

describe('Config', () => {
  afterEach(Config.__reset__)

  test('default props', () => {
    expect(Config.baseUrl).toBeNull()
    expect(Config.httpHeaders).toEqual({})
  })

  test('setBaseUrl', () => {
    Config.setBaseUrl('https://myapi.server/api')

    expect(Config.baseUrl).toBe('https://myapi.server/api')
  })

  test('setHttpHeader', () => {
    Config.setHttpHeader('authorization', 'token')

    expect(Config.httpHeaders).toEqual({
      authorization: 'token'
    })
  })

  test('setHttpHeaders', () => {
    Config.setHttpHeaders({
      authorization: 'token',
      application: 'admin'
    })

    expect(Config.httpHeaders).toEqual({
      authorization: 'token',
      application: 'admin'
    })
  })
})
