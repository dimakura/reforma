import { isType, isPrimitiveType, serialize, deserialize } from 'reforma'
import { getType } from 'reforma/registry'
import floatType from '../float'

describe('float type', () => {
  test('raw type', () => {
    expect(isType(floatType)).toBe(true)
    expect(isPrimitiveType(floatType)).toBe(true)
  })

  test('in registry', () => {
    expect(getType('float')).toBe(floatType)
    expect(getType('double')).toBe(floatType)
  })

  test('serialization', () => {
    expect(serialize(floatType, 10.5)).toBe(10.5)
    expect(serialize(floatType, '10.55')).toBe(10.55)
    expect(serialize(floatType, null)).toBeUndefined()
  })

  test('deserialization', () => {
    expect(deserialize(floatType, 10.5)).toBe(10.5)
    expect(deserialize(floatType, '10.55')).toBe(10.55)
    expect(deserialize(floatType, null)).toBeUndefined()
  })
})
