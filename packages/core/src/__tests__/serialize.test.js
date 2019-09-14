import Reforma from '@reforma/core'
import { serializeType } from '../serialize'

describe('serializeType', () => {
  test('number serialization', () => {
    expect(serializeType(Reforma.integer, 1)).toBe(1)
    expect(serializeType(Reforma.float, 1)).toBe(1)
    expect(serializeType(Reforma.float, '1')).toBeNull()
  })

  test('string serialization', () => {
    expect(serializeType(Reforma.string, 1)).toBe('1')
    expect(serializeType(Reforma.string, 'text')).toBe('text')
  })

  test('boolean serialization', () => {
    expect(serializeType(Reforma.bool, true)).toBe(true)
    expect(serializeType(Reforma.bool, false)).toBe(false)
    expect(serializeType(Reforma.bool, 1)).toBeNull()
  })

  test('datetime serialization', () => {
    const date = new Date(1566572844574)
    expect(serializeType(Reforma.datetime, date)).toBe('2019-08-23T15:07:24.574Z')
  })

  test('array serialization', () => {
    const type = Reforma.arrayOf(Reforma.integer)
    expect(serializeType(type, [1, 2, 3])).toEqual([1, 2, 3])
  })

  test('map serialization', () => {
    const type = Reforma.mapOf(Reforma.string, Reforma.string)
    const data = { id: 1, firstName: 'Ray', lastName: 'Dalio' }
    expect(serializeType(type, data)).toEqual({
      id: '1',
      firstName: 'Ray',
      lastName: 'Dalio'
    })
  })

  test('user defined type serialization', () => {
    const type = Reforma.createType({
      name: 'Profile',
      fields: {
        id: Reforma.integer.id,
        firstName: Reforma.string,
        lastName: Reforma.string
      }
    })
    const data = { id: 1, firstName: 'Ray', lastName: 'Dalio' }

    expect(serializeType(type, data)).toEqual({
      id: 1,
      first_name: 'Ray',
      last_name: 'Dalio'
    })
    expect(serializeType(type, data, ['firstName', 'lastName'])).toEqual({
      first_name: 'Ray',
      last_name: 'Dalio'
    })
  })
})
