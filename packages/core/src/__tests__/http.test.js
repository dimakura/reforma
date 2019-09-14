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

describe('http errors', () => {
  test('fromException', () => {
    const ex = new Error()
    const error = Reforma.http.exceptionError(ex)

    expect(error.__isError__).toBe(true)
    expect(error.__isException__).toBe(true)
    expect(error.exception).toBe(ex)
  })

  test('failedResponse', () => {
    const error = Reforma.http.failedError(404, 'Not found', 'No such order')

    expect(error.__isError__).toBe(true)
    expect(error.status).toBe(404)
    expect(error.statusText).toBe('Not found')
    expect(error.body).toBe('No such order')
  })
})
