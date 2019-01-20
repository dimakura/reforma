import moxios from 'moxios'
const {
  __httpClient__,
  updateClient,
  getAsync,
  postAsync,
  putAsync,
  deleteAsync
} = jest.requireActual('..')

describe('Api', () => {
  const data = {
    firstName: 'Dimitri',
    lastName: 'Kurashvili'
  }

  const responseData = {
    id: 1,
    first_name: 'Dimitri',
    last_name: 'Kurashvili'
  }

  function assertSuccessfulResponse(resp) {
    expect(resp.isSuccess).toBe(true)
    expect(resp.data).toEqual({
      id: 1,
      firstName: 'Dimitri',
      lastName: 'Kurashvili'
    })
  }

  beforeEach(() => {
    moxios.install(__httpClient__())
  })

  afterEach(() => {
    moxios.uninstall(__httpClient__())
    updateClient()
  })

  test('updateClient', () => {
    updateClient({
      baseUrl: 'https://my.server/api',
      httpHeaders: {
        authorization: 'token'
      }
    })
    const client = __httpClient__()

    expect(client.defaults.timeout).toBe(10000)
    expect(client.defaults.headers.authorization).toBe('token')
    expect(client.defaults.baseURL).toBe('https://my.server/api')
  })

  test('getAsync', async () => {
    let request
    moxios.wait(async () => {
      request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: responseData
        }
      })
    })

    const resp = await getAsync('/profiles/1')

    expect(request.config.url).toBe('/profiles/1')
    expect(request.config.method).toBe('get')

    assertSuccessfulResponse(resp)
  })

  test('postAsync', async () => {
    let request
    moxios.wait(async () => {
      request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: responseData
        }
      })
    })

    const resp = await postAsync('/profiles', data)

    expect(request.config.url).toBe('/profiles')
    expect(request.config.method).toBe('post')
    expect(JSON.parse(request.config.data)).toEqual({
      first_name: 'Dimitri',
      last_name: 'Kurashvili'
    })

    assertSuccessfulResponse(resp)
  })

  test('putAsync', async () => {
    let request
    moxios.wait(async () => {
      request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: responseData
        }
      })
    })

    const resp = await putAsync('/profiles/1', data)

    expect(request.config.url).toBe('/profiles/1')
    expect(request.config.method).toBe('put')
    expect(JSON.parse(request.config.data)).toEqual({
      first_name: 'Dimitri',
      last_name: 'Kurashvili'
    })

    assertSuccessfulResponse(resp)
  })

  test('deleteAsync', async () => {
    let request
    moxios.wait(async () => {
      request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          data: {
            ok: true
          }
        }
      })
    })

    const resp = await deleteAsync('/profiles/1')

    expect(request.config.url).toBe('/profiles/1')
    expect(request.config.method).toBe('delete')
    expect(request.config.data).toBe(undefined)
    expect(resp.isSuccess).toBe(true)
  })
})
