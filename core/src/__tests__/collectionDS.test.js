import Reforma from '@reforma/core'

describe('Collection data source', () => {
  let type

  beforeEach(() => {
    type = Reforma.createType({
      name: 'Profile',
      fields: {
        id: Reforma.integer.id,
        firstName: Reforma.string,
        lastName: Reforma.string
      }
    })
  })

  describe('creation', () => {
    test('normal scenario', () => {
      const ds = Reforma.createCollectionDS({
        type,
        serialRoot: 'profiles',
        params: {
          firstName: 'Ben'
        }
      })

      expect(ds.__isCollectionDS__).toBe(true)
      expect(ds.type).toBe(type)
      expect(ds.serialRoot).toBe('profiles')
      expect(ds.url).toBe('/profiles')
      expect(ds.params).toEqual({ firstName: 'Ben' })
      expect(ds.prevParams).toBeNull()
      expect(ds.status).toBe('initial')
      expect(ds.body).toBeNull()
      expect(ds.data).toBeNull()
      expect(ds.headers).toBeNull()
      expect(ds.error).toBeNull()
    })

    test('wrong scenarios', () => {
      expect(() => {
        Reforma.createCollectionDS()
      }).toThrow('Wrong set of options for createCollectionDS: undefined')

      expect(() => {
        Reforma.createCollectionDS({
          type: Reforma.integer
        })
      }).toThrow('Wrong datasource type: integer')
    })
  })

  describe('fetch', () => {
    let ds

    beforeEach(() => {
      ds = Reforma.createCollectionDS({
        type,
        serialRoot: 'profiles',
        params: {
          firstName: 'John'
        }
      })
    })

    test('normal scenario', async () => {
      Reforma.http.get = jest.fn(() => ({
        ok: true,
        json: () => ({
          profiles: [{
            id: '1',
            first_name: 'John',
            last_name: 'Quincy Adams'
          }],
          totalCount: 10
        }),
        headers: { 'X-Total-Count': 10 }
      }))
      const listener = jest.fn()

      expectInitialDS(ds)
      ds.addStatusListener(listener)
      const promise = ds.fetch({
        lastName: 'Quincy Adams'
      })
      expectFetchingDS(ds)
      await promise
      expectReadyDS(ds)
      expect(ds.headers).toEqual({ 'X-Total-Count': 10 })
      expect(ds.body).toEqual({
        profiles: [{
          id: '1',
          first_name: 'John',
          last_name: 'Quincy Adams'
        }],
        totalCount: 10
      })

      expect(listener).toHaveBeenCalledWith('initial', 'fetching')
      expect(listener).toHaveBeenCalledWith('fetching', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)

      expect(Reforma.http.get).toHaveBeenCalledWith('/profiles', {
        params: {
          firstName: 'John',
          lastName: 'Quincy Adams'
        },
        signal: expect.anything()
      })
      expect(Reforma.http.get).toHaveBeenCalledTimes(1)

      const profile = ds.data[0]
      expect(profile.__type__).toBe(type)
      expect(profile.id).toBe(1)
      expect(profile.firstName).toBe('John')
      expect(profile.lastName).toBe('Quincy Adams')

      // re-fetch
      Reforma.http.get.mockClear()
      listener.mockClear()
      await ds.refetch()
      expect(Reforma.http.get).toHaveBeenCalledWith('/profiles', {
        params: {
          firstName: 'John',
          lastName: 'Quincy Adams'
        },
        signal: expect.anything()
      })
      expect(Reforma.http.get).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith('ready', 'fetching')
      expect(listener).toHaveBeenCalledWith('fetching', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)
    })

    test('failed request', async () => {
      Reforma.http.get = jest.fn(() => ({
        ok: false,
        status: 404,
        statusText: 'Not found',
        json: () => ({
          error: 'Unknown resource'
        })
      }))
      const listener = jest.fn()

      expectInitialDS(ds)
      ds.addStatusListener(listener)
      const promise = ds.fetch()
      expectFetchingDS(ds)
      await promise
      expectFailedDS(ds)
      expect(ds.body).toEqual({
        error: 'Unknown resource'
      })

      expect(listener).toHaveBeenCalledWith('initial', 'fetching')
      expect(listener).toHaveBeenCalledWith('fetching', 'failed')
      expect(listener).toHaveBeenCalledTimes(2)
    })

    test('exception request', async () => {
      const ex = new Error()
      Reforma.http.get = jest.fn(() => {
        return new Promise(() => { throw ex })
      })

      expectInitialDS(ds)
      const promise = ds.fetch()
      expectFetchingDS(ds)
      await promise
      expectFailedDS(ds)
      expect(ds.body).toBeNull()
    })
  })
})

function expectInitialDS(ds) {
  expect(ds.status).toBe('initial')
  expect(ds.headers).toBeNull()
  expect(ds.data).toBeNull()
  expect(ds.error).toBeNull()
}

function expectFetchingDS(ds) {
  expect(ds.status).toBe('fetching')
  expect(ds.data).toBeNull()
  expect(ds.headers).toBeNull()
  expect(ds.error).toBeNull()
}

function expectReadyDS(ds) {
  expect(ds.status).toBe('ready')
  expect(ds.data).toBeInstanceOf(Array)
  expect(ds.error).toBeNull()
}

function expectFailedDS(ds) {
  expect(ds.status).toBe('failed')
  expect(ds.error.__isError__).toBe(true)
}
