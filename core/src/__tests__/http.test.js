import Reforma from '@reforma/core'
import fetch from 'node-fetch'
jest.mock('node-fetch')

describe('http', () => {
  beforeEach(() => {
    Reforma.config.http.baseUrl = 'https://move4.app/api'
    Reforma.config.http.setHeader('Authorization', 'my-token')
  })

  test('get', () => {
    fetch.mockReturnValue('result')

    expect(Reforma.http.get('/profiles')).toBe('result')
    expect(fetch).toHaveBeenCalledWith('https://move4.app/api/profiles', {
      method: 'GET',
      signal: null,
      timeout: 10000,
      headers: {
        Authorization: 'my-token'
      }
    })
  })
})
