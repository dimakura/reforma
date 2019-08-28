import Reforma from '@reforma/core'

describe('Collection data source', () => {
  describe('creation', () => {
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
      expect(ds.errors).toBeNull()
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
})
