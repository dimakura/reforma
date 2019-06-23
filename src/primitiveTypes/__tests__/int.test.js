import { isType, isPrimitiveType, serialize, deserialize } from 'reforma'
import { getType } from 'reforma/registry'
import intType from '../int'

describe('integer type', () => {
  test('raw type', () => {
    expect(isType(intType)).toBe(true)
    expect(isPrimitiveType(intType)).toBe(true)
  })

  test('in registry', () => {
    expect(getType('int')).toBe(intType)
    expect(getType('integer')).toBe(intType)
  })

  test('serialization', () => {
    expect(serialize(intType, 1)).toBe(1)
    expect(serialize(intType, '1')).toBe(1)
    expect(serialize(intType, '1.5')).toBe(1)
    expect(serialize(intType, null)).toBeUndefined()
  })

  test('deserialization', () => {
    expect(deserialize(intType, 1)).toBe(1)
    expect(deserialize(intType, '1')).toBe(1)
    expect(deserialize(intType, '1.5')).toBe(1)
    expect(deserialize(intType, null)).toBeUndefined()
  })
})
