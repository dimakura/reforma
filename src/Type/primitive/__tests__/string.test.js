import { Type } from 'reforma'
import stringType from '../string'

describe('string type', () => {
  test('raw type', () => {
    Type.isType(stringType)
    Type.isPrimitiveType(stringType)
  })

  test('in registry', () => {
    expect(Type.getType('string')).toBe(stringType)
    expect(Type.getType('text')).toBe(stringType)
  })

  test('serialization', () => {
    expect(Type.serialize(stringType, 'Dimitri')).toBe('Dimitri')
    expect(Type.serialize(stringType, 10)).toBe('10')
    expect(Type.serialize(stringType, {})).toBe('[object Object]')
    expect(Type.serialize(stringType, null)).toBeUndefined()
  })

  test('deserialization', () => {
    expect(Type.deserialize(stringType, 'Dimitri')).toBe('Dimitri')
    expect(Type.deserialize(stringType, 10)).toBe('10')
    expect(Type.deserialize(stringType, {})).toBe('[object Object]')
    expect(Type.deserialize(stringType, null)).toBeUndefined()
  })
})
