import Reforma from '@reforma/core'
import fetch from 'node-fetch'
jest.mock('node-fetch')

describe('http', () => {
  const resp = 'response'

  beforeEach(() => {
    fetch.mockReturnValue(resp)
    Reforma.config.http.baseUrl = 'https://move4.app/api'
    Reforma.config.http.setHeader('Authorization', 'my-token')
  })

  test('get', () => {
    expect(Reforma.http.get('/profiles')).toBe(resp)

    expect(fetch).toHaveBeenCalledWith('https://move4.app/api/profiles', {
      method: 'GET',
      signal: null,
      timeout: 10000,
      headers: {
        Authorization: 'my-token'
      }
    })
  })

  test('post', () => {
    expect(Reforma.http.post('/profiles', {
      data: {
        first_name: 'Andrew',
        last_name: 'Jackson'
      }
    })).toBe(resp)

    expect(fetch).toHaveBeenCalledWith('https://move4.app/api/profiles', {
      method: 'POST',
      signal: null,
      timeout: 10000,
      body: '{"first_name":"Andrew","last_name":"Jackson"}',
      headers: {
        Authorization: 'my-token'
      }
    })
  })

  test('put', () => {
    expect(Reforma.http.put('/profiles/:id', {
      params: {
        id: 1
      },
      data: {
        first_name: 'Andrew',
        last_name: 'Jackson'
      }
    })).toBe(resp)

    expect(fetch).toHaveBeenCalledWith('https://move4.app/api/profiles/1', {
      method: 'PUT',
      signal: null,
      timeout: 10000,
      body: '{"first_name":"Andrew","last_name":"Jackson"}',
      headers: {
        Authorization: 'my-token'
      }
    })
  })

  test('delete', () => {
    expect(Reforma.http.delete('/profiles/:id', {
      params: {
        id: 1
      }
    })).toBe(resp)

    expect(fetch).toHaveBeenCalledWith('https://move4.app/api/profiles/1', {
      method: 'DELETE',
      signal: null,
      timeout: 10000,
      headers: {
        Authorization: 'my-token'
      }
    })
  })
})
