import { Type } from 'reforma'
import floatType from '../float'

describe('float type', () => {
  test('raw type', () => {
    Type.isType(floatType)
    Type.isPrimitiveType(floatType)
  })

  test('in registry', () => {
    expect(Type.getType('float')).toBe(floatType)
    expect(Type.getType('double')).toBe(floatType)
  })

  test('serialization', () => {
    expect(Type.serialize(floatType, 10.5)).toBe(10.5)
    expect(Type.serialize(floatType, '10.55')).toBe(10.55)
    expect(Type.serialize(floatType, null)).toBeUndefined()
  })

  test('deserialization', () => {
    expect(Type.deserialize(floatType, 10.5)).toBe(10.5)
    expect(Type.deserialize(floatType, '10.55')).toBe(10.55)
    expect(Type.deserialize(floatType, null)).toBeUndefined()
  })
})
