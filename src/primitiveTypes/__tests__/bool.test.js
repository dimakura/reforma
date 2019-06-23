import { isType, isPrimitiveType, serialize, deserialize } from 'reforma'
import { getType } from 'reforma/registry'
import boolType from '../bool'

describe('bool type', () => {
  test('raw type', () => {
    isType(boolType)
    isPrimitiveType(boolType)
  })

  test('in registry', () => {
    expect(getType('bool')).toBe(boolType)
    expect(getType('boolean')).toBe(boolType)
  })

  test('serialization', () => {
    expect(serialize(boolType, false)).toBe(false)
    expect(serialize(boolType, true)).toBe(true)
    expect(serialize(boolType, 0)).toBeUndefined()
    expect(serialize(boolType, 1)).toBeUndefined()
    expect(serialize(boolType, 'false')).toBeUndefined()
    expect(serialize(boolType, 'true')).toBeUndefined()
  })

  test('deserialization', () => {
    expect(deserialize(boolType, false)).toBe(false)
    expect(deserialize(boolType, true)).toBe(true)
    expect(deserialize(boolType, 'false')).toBe(false)
    expect(deserialize(boolType, 'true')).toBe(true)
    expect(deserialize(boolType, 0)).toBe(false)
    expect(deserialize(boolType, 1)).toBe(true)
    expect(deserialize(boolType, '0')).toBe(false)
    expect(deserialize(boolType, '1')).toBe(true)
    expect(deserialize(boolType, 'False')).toBeUndefined()
    expect(deserialize(boolType, 'True')).toBeUndefined()
  })
})
