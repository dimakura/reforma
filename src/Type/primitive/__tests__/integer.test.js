import { Type } from 'reforma'
import intType from '../integer'

describe('integer type', () => {
  test('raw type', () => {
    Type.isType(intType)
    Type.isPrimitiveType(intType)
  })

  test('in registry', () => {
    expect(Type.getType('int')).toBe(intType)
    expect(Type.getType('integer')).toBe(intType)
  })

  test('serialization', () => {
    expect(Type.serialize(intType, 1)).toBe(1)
    expect(Type.serialize(intType, '1')).toBe(1)
    expect(Type.serialize(intType, '1.5')).toBe(1)
    expect(Type.serialize(intType, null)).toBeUndefined()
  })

  test('deserialization', () => {
    expect(Type.deserialize(intType, 1)).toBe(1)
    expect(Type.deserialize(intType, '1')).toBe(1)
    expect(Type.deserialize(intType, '1.5')).toBe(1)
    expect(Type.deserialize(intType, null)).toBeUndefined()
  })
})
