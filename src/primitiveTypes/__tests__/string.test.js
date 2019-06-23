import { isType, isPrimitiveType, serialize, deserialize } from 'reforma'
import { getType } from 'reforma/registry'
import stringType from '../string'

describe('string type', () => {
  test('raw type', () => {
    isType(stringType)
    isPrimitiveType(stringType)
  })

  test('in registry', () => {
    expect(getType('string')).toBe(stringType)
    expect(getType('text')).toBe(stringType)
  })

  test('serialization', () => {
    expect(serialize(stringType, 'Dimitri')).toBe('Dimitri')
    expect(serialize(stringType, 10)).toBe('10')
    expect(serialize(stringType, {})).toBe('[object Object]')
    expect(serialize(stringType, null)).toBeUndefined()
  })

  test('deserialization', () => {
    expect(deserialize(stringType, 'Dimitri')).toBe('Dimitri')
    expect(deserialize(stringType, 10)).toBe('10')
    expect(deserialize(stringType, {})).toBe('[object Object]')
    expect(deserialize(stringType, null)).toBeUndefined()
  })
})
