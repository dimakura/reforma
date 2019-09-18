import Reforma from '@reforma/core'

describe('Record data source', () => {
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
      const ds = Reforma.createRecordDS({
        type,
        serialRoot: 'profile',
        url: '/profiles/:id'
      })

      expect(ds.__isRecordDS__).toBe(true)
      expect(ds.type).toBe(type)
      expect(ds.serialRoot).toBe('profile')
      expect(ds.url).toBe('/profiles/:id')
      expect(ds.params).toBeNull()
      expect(ds.status).toBe('initial')
      expect(ds.body).toBeNull()
      expect(ds.data).toBeNull()
      expect(ds.headers).toBeNull()
      expect(ds.error).toBeNull()
    })

    test('wrong scenarios', () => {
      expect(() => {
        Reforma.createRecordDS()
      }).toThrow('Wrong set of options for createRecordDS: undefined')

      expect(() => {
        Reforma.createRecordDS({
          type: Reforma.integer
        })
      }).toThrow('Wrong datasource type: integer')
    })
  })

  describe('fetch and reset', () => {
    let ds

    beforeEach(() => {
      ds = Reforma.createRecordDS({
        type,
        serialRoot: 'profile',
        url: '/profiles/:id'
      })
    })

    test('normal scenario', async () => {
      Reforma.http.get = jest.fn(() => ({
        ok: true,
        json: () => ({
          profile: {
            id: '1',
            first_name: 'John',
            last_name: 'Quincy Adams'
          }
        }),
        headers: { 'X-Total-Count': 10 }
      }))
      const listener = jest.fn()

      expectInitialDS(ds)
      ds.addStatusListener(listener)
      const promise = ds.fetch(1)
      expectBusyDS(ds)
      await promise
      expectReadyDS(ds)
      expect(ds.headers).toEqual({ 'X-Total-Count': 10 })
      expect(ds.body).toEqual({
        profile: {
          id: '1',
          first_name: 'John',
          last_name: 'Quincy Adams'
        }
      })

      expect(listener).toHaveBeenCalledWith('initial', 'busy')
      expect(listener).toHaveBeenCalledWith('busy', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)

      expect(Reforma.http.get).toHaveBeenCalledWith('/profiles/:id', {
        params: { id: 1 },
        signal: expect.anything()
      })
      expect(Reforma.http.get).toHaveBeenCalledTimes(1)

      const profile = ds.data
      expect(profile.__type__).toBe(type)
      expect(profile.id).toBe(1)
      expect(profile.firstName).toBe('John')
      expect(profile.lastName).toBe('Quincy Adams')

      // re-fetch
      Reforma.http.get.mockClear()
      listener.mockClear()
      await ds.refetch()
      expect(Reforma.http.get).toHaveBeenCalledWith('/profiles/:id', {
        params: { id: 1 },
        signal: expect.anything()
      })
      expect(Reforma.http.get).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith('ready', 'busy')
      expect(listener).toHaveBeenCalledWith('busy', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)

      // try reset
      ds.reset()
      expectInitialDS(ds)
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
      expectBusyDS(ds)
      await promise
      expectFailedDS(ds)
      expect(ds.body).toEqual({
        error: 'Unknown resource'
      })

      expect(listener).toHaveBeenCalledTimes(2)
      expect(listener).toHaveBeenCalledWith('initial', 'busy')
      expect(listener).toHaveBeenCalledWith('busy', 'failed')

      // try reset
      ds.reset()
      expectInitialDS(ds)
    })

    test('exception request', async () => {
      const ex = new Error()
      Reforma.http.get = jest.fn(() => {
        return new Promise(() => { throw ex })
      })

      expectInitialDS(ds)
      const promise = ds.fetch()
      expectBusyDS(ds)
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

function expectBusyDS(ds) {
  expect(ds.status).toBe('busy')
  expect(ds.data).toBeNull()
  expect(ds.headers).toBeNull()
  expect(ds.error).toBeNull()
}

function expectReadyDS(ds) {
  expect(ds.status).toBe('ready')
  expect(ds.data.__type__.__isUserDefinedType__).toBe(true)
  expect(ds.error).toBeNull()
}

function expectFailedDS(ds) {
  expect(ds.status).toBe('failed')
  expect(ds.error.__isError__).toBe(true)
}
