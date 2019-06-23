import { Type } from 'reforma'
import boolType from '../bool'

describe('bool type', () => {
  test('raw type', () => {
    Type.isType(boolType)
    Type.isPrimitiveType(boolType)
  })

  test('in registry', () => {
    expect(Type.getType('bool')).toBe(boolType)
    expect(Type.getType('boolean')).toBe(boolType)
  })

  test('serialization', () => {
    expect(Type.serialize(boolType, false)).toBe(false)
    expect(Type.serialize(boolType, true)).toBe(true)
    expect(Type.serialize(boolType, 0)).toBeUndefined()
    expect(Type.serialize(boolType, 1)).toBeUndefined()
    expect(Type.serialize(boolType, 'false')).toBeUndefined()
    expect(Type.serialize(boolType, 'true')).toBeUndefined()
  })

  test('deserialization', () => {
    expect(Type.deserialize(boolType, false)).toBe(false)
    expect(Type.deserialize(boolType, true)).toBe(true)
    expect(Type.deserialize(boolType, 'false')).toBe(false)
    expect(Type.deserialize(boolType, 'true')).toBe(true)
    expect(Type.deserialize(boolType, 0)).toBe(false)
    expect(Type.deserialize(boolType, 1)).toBe(true)
    expect(Type.deserialize(boolType, '0')).toBe(false)
    expect(Type.deserialize(boolType, '1')).toBe(true)
    expect(Type.deserialize(boolType, 'False')).toBeUndefined()
    expect(Type.deserialize(boolType, 'True')).toBeUndefined()
  })
})
