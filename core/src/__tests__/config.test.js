import Reforma from '@reforma/core'

describe('config', () => {
  test('baseUrl', () => {
    expect(Reforma.config.http.baseUrl).toBeNull()
    Reforma.config.http.baseUrl = 'https://move4.app/api'
    expect(Reforma.config.http.baseUrl).toBe('https://move4.app/api')
  })

  test('headers', () => {
    expect(Reforma.config.http.headers).toEqual({})
    Reforma.config.http.setHeader('Authorization', 'my-token')
    Reforma.config.http.setHeader('MaxAge', '3 days')
    expect(Reforma.config.http.headers).toEqual({
      Authorization: 'my-token',
      MaxAge: '3 days'
    })
  })

  test('timeout', () => {
    expect(Reforma.config.http.timeout).toBe(10000)
    Reforma.config.http.timeout = 5000
    expect(Reforma.config.http.timeout).toBe(5000)
  })
})
