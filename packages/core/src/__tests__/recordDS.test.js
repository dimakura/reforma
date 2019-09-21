import Reforma from '@reforma/core'
import { createType, createRecordDS } from 'Test/factories'

describe('Record data source', () => {
  describe('createRecordDS', () => {
    test('normal scenario', () => {
      const type = createType()
      const ds = Reforma.createRecordDS({
        type,
        serialRoot: 'profile',
        url: '/profiles'
      })

      expect(ds.__isRecordDS__).toBe(true)
      expect(ds.type).toBe(type)
      expect(ds.serialRoot).toBe('profile')
      expect(ds.url).toBe('/profiles')
      expect(ds.recordUrl).toBe('/profiles/:id')
      expect(ds.id).toBeNull()
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
        Reforma.createRecordDS({})
      }).toThrow('Specify url when creating record data source')

      expect(() => {
        Reforma.createRecordDS({
          url: '/profiles',
          type: Reforma.integer
        })
      }).toThrow('Wrong datasource type: integer')
    })
  })

  test('id normalization', () => {
    const ds = createRecordDS()

    expect(ds.normalizeId(1)).toEqual([1])
    expect(ds.normalizeId('1')).toEqual([1])
    expect(ds.normalizeId(null)).toBeNull()
  })

  describe('requests', () => {
    let ds
    const data = {
      profile: {
        id: '1',
        first_name: 'John',
        last_name: 'Quincy Adams'
      }
    }

    beforeEach(() => {
      ds = createRecordDS()
    })

    describe('fetch', () => {
      test('normal scenario', async () => {
        Reforma.http.get = jest.fn(() => ({
          ok: true,
          json: () => data,
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
        expect(ds.body).toEqual(data)

        expect(listener).toHaveBeenCalledWith('initial', 'busy')
        expect(listener).toHaveBeenCalledWith('busy', 'ready')
        expect(listener).toHaveBeenCalledTimes(2)

        expect(Reforma.http.get).toHaveBeenCalledWith('/profiles/:id', {
          params: { id: [1] },
          signal: expect.anything()
        })
        expect(Reforma.http.get).toHaveBeenCalledTimes(1)

        const profile = ds.data
        expect(profile.__type__).toBe(ds.type)
        expect(profile.id).toBe(1)
        expect(profile.firstName).toBe('John')
        expect(profile.lastName).toBe('Quincy Adams')

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

    test('create', async () => {
      Reforma.http.post = jest.fn(() => ({
        ok: true,
        json: () => data,
        headers: { 'X-Expires-At': 'soon' }
      }))
      const listener = jest.fn()
      ds.addStatusListener(listener)

      await ds.create({
        firstName: 'John',
        lastName: 'Quincy Adams'
      }, ['firstName', 'lastName'])

      expectReadyDS(ds)
      expect(ds.body).toEqual(data)
      expect(ds.headers).toEqual({ 'X-Expires-At': 'soon' })

      expect(listener).toHaveBeenCalledWith('initial', 'busy')
      expect(listener).toHaveBeenCalledWith('busy', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)

      expect(Reforma.http.post).toHaveBeenCalledWith('/profiles', {
        data: {
          first_name: 'John',
          last_name: 'Quincy Adams'
        },
        signal: expect.anything()
      })
      expect(Reforma.http.post).toHaveBeenCalledTimes(1)

      const profile = ds.data
      expect(profile.__type__).toBe(ds.type)
      expect(profile.id).toBe(1)
      expect(profile.firstName).toBe('John')
      expect(profile.lastName).toBe('Quincy Adams')

      // try reset
      ds.reset()
      expectInitialDS(ds)
    })

    test('update', async () => {
      Reforma.http.put = jest.fn(() => ({
        ok: true,
        json: () => data,
        headers: { 'X-Expires-At': 'soon' }
      }))
      const listener = jest.fn()
      ds.addStatusListener(listener)

      await ds.update(10, {
        firstName: 'John',
        lastName: 'Quincy Adams'
      }, ['firstName', 'lastName'])

      expectReadyDS(ds)
      expect(ds.body).toEqual(data)
      expect(ds.headers).toEqual({ 'X-Expires-At': 'soon' })

      expect(listener).toHaveBeenCalledWith('initial', 'busy')
      expect(listener).toHaveBeenCalledWith('busy', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)

      expect(Reforma.http.put).toHaveBeenCalledWith('/profiles/:id', {
        params: {
          id: [10]
        },
        data: {
          first_name: 'John',
          last_name: 'Quincy Adams'
        },
        signal: expect.anything()
      })
      expect(Reforma.http.put).toHaveBeenCalledTimes(1)

      const profile = ds.data
      expect(profile.__type__).toBe(ds.type)
      expect(profile.id).toBe(1)
      expect(profile.firstName).toBe('John')
      expect(profile.lastName).toBe('Quincy Adams')

      // try reset
      ds.reset()
      expectInitialDS(ds)
    })

    test('delete', async () => {
      Reforma.http.delete = jest.fn(() => ({
        ok: true,
        json: () => ({ status: 'ok' }),
        headers: { 'X-Record-Id': 10 }
      }))
      const listener = jest.fn()
      ds.addStatusListener(listener)

      await ds.delete(10)

      expectReadyDS(ds)
      expect(ds.body).toEqual({ status: 'ok' })
      expect(ds.headers).toEqual({ 'X-Record-Id': 10 })

      expect(listener).toHaveBeenCalledWith('initial', 'busy')
      expect(listener).toHaveBeenCalledWith('busy', 'ready')
      expect(listener).toHaveBeenCalledTimes(2)

      expect(Reforma.http.delete).toHaveBeenCalledWith('/profiles/:id', {
        params: { id: [10] },
        signal: expect.anything()
      })
      expect(Reforma.http.delete).toHaveBeenCalledTimes(1)

      expect(ds.data).toBeNull()

      // try reset
      ds.reset()
      expectInitialDS(ds)
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
  if (ds.data != null) {
    expect(ds.data.__type__.__isUserDefinedType__).toBe(true)
  }
  expect(ds.error).toBeNull()
}

function expectFailedDS(ds) {
  expect(ds.status).toBe('failed')
  expect(ds.error.__isError__).toBe(true)
}
