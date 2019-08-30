import Reforma from '@reforma/core'
// jest.mock('../http')

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
      expect(ds.data).toBeNull()
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
          }]
        })
      }))

      expectInitialDS(ds)
      const promise = ds.fetch()
      expectFetchingDS(ds)
      await promise
      expectReadyDS(ds)

      const profile = ds.data[0]
      expect(profile.id).toBe(1)
      expect(profile.firstName).toBe('John')
      expect(profile.lastName).toBe('Quincy Adams')
    })

    test('failed request', async () => {
      Reforma.http.get = jest.fn(() => ({
        ok: false,
        status: 404,
        statusText: 'Not found',
        json: () => ({})
      }))

      expectInitialDS(ds)
      const promise = ds.fetch()
      expectFetchingDS(ds)
      await promise
      expectFailedDS(ds)
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
    })
  })
})

function expectInitialDS(ds) {
  expect(ds.status).toBe('initial')
  expect(ds.data).toBeNull()
  expect(ds.error).toBeNull()
}

function expectFetchingDS(ds) {
  expect(ds.status).toBe('fetching')
  expect(ds.data).toBeNull()
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
