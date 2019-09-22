import Reforma from '@reforma/core'
import { instantiateType } from '../instance'

describe('instantiateType', () => {
  test('integer', () => {
    expect(instantiateType(Reforma.integer, 1)).toBe(1)
    expect(instantiateType(Reforma.integer, '2')).toBe(2)
    expect(instantiateType(Reforma.integer, '10.4')).toBe(10)
    expect(instantiateType(Reforma.integer, [0, 1, 2])).toBe(0)
    expect(instantiateType(Reforma.integer, { toString: () => 100 })).toBe(100)
    expect(instantiateType(Reforma.integer, null)).toBeNull()
    expect(instantiateType(Reforma.integer, 'a')).toBeNull()
    expect(instantiateType(Reforma.integer, { value: 1 })).toBeNull()
  })

  test('float', () => {
    expect(instantiateType(Reforma.float, 1)).toBe(1)
    expect(instantiateType(Reforma.float, '10.4')).toBe(10.4)
    expect(instantiateType(Reforma.float, null)).toBeNull()
    expect(instantiateType(Reforma.float, 'a')).toBeNull()
    expect(instantiateType(Reforma.float, { value: 1 })).toBeNull()
  })

  test('string', () => {
    expect(instantiateType(Reforma.string, 1)).toBe('1')
    expect(instantiateType(Reforma.string, 'test')).toBe('test')
    expect(instantiateType(Reforma.string, null)).toBeNull()
  })

  test('bool', () => {
    expect(instantiateType(Reforma.bool, true)).toBe(true)
    expect(instantiateType(Reforma.bool, 1)).toBe(true)
    expect(instantiateType(Reforma.bool, false)).toBe(false)
    expect(instantiateType(Reforma.bool, 0)).toBe(false)
    expect(instantiateType(Reforma.bool, null)).toBeNull()
    expect(instantiateType(Reforma.bool, 'true')).toBeNull()
    expect(instantiateType(Reforma.bool, 'false')).toBeNull()
  })

  test('datetime', () => {
    const date = new Date()
    const parsedDate = instantiateType(Reforma.datetime, date.toString())
    expect(parsedDate).toBeInstanceOf(Date)
    expect(parsedDate.toGMTString()).toBe(date.toGMTString())
    expect(instantiateType(Reforma.datetime, date)).toBe(date)
    expect(instantiateType(Reforma.datetime, 0)).toBeNull()
    expect(instantiateType(Reforma.datetime, 'not-a-date')).toBeNull()
  })

  test('array', () => {
    const type = Reforma.arrayOf(Reforma.integer)
    expect(instantiateType(type, [1, 2, 3])).toEqual([1, 2, 3])
    expect(instantiateType(type, ['1', '2', '3'])).toEqual([1, 2, 3])
    expect(instantiateType(type, '10')).toEqual([10])
    expect(instantiateType(type, 'x')).toBeNull()
  })

  test('map', () => {
    const type = Reforma.mapOf(Reforma.string, Reforma.integer)
    expect(instantiateType(type, { a: 1, b: '2', 3: '300' })).toEqual({ a: 1, b: 2, 3: 300 })
    expect(instantiateType(type, 10)).toBeNull()
  })

  describe('user defined type', () => {
    let type

    beforeEach(() => {
      type = Reforma.createType({
        name: 'Profile',
        fields: {
          id: Reforma.integer.id,
          firstName: Reforma.string,
          lastName: Reforma.string,
          fullName: Reforma.string.calc((self) => `${self.firstName} ${self.lastName}`)
        }
      })
    })

    test('create using snake case keys', () => {
      const instance = instantiateType(type, {
        id: '1',
        first_name: 'Henry',
        last_name: 'Ford'
      })

      instanceExpectation(instance)
    })

    test('create using camel case case keys', () => {
      const instance = instantiateType(type, {
        id: '1',
        firstName: 'Henry',
        lastName: 'Ford'
      })

      instanceExpectation(instance)
    })

    function instanceExpectation(instance) {
      expect(instance.__type__).toBe(type)

      expect(instance.id).toBe(1)
      expect(instance.firstName).toBe('Henry')
      expect(instance.lastName).toBe('Ford')
      expect(instance.fullName).toBe('Henry Ford')

      instance.id = '100'
      instance.firstName = 'Wernher'
      instance.lastName = 'von Braun'
      expect(instance.id).toBe(100)
      expect(instance.firstName).toBe('Wernher')
      expect(instance.lastName).toBe('von Braun')
      expect(instance.fullName).toBe('Wernher von Braun')
      expect(instance.getId()).toEqual([100])
    }
  })
})
