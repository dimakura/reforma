import { createType } from '../index'

const primitiveTypes = [
  'bool',
  'date',
  'float',
  'image',
  'integer',
  'string'
]

describe('createType', () => {
  test('primitive types', () => {
    primitiveTypes.forEach(typeName => {
      const type = createType(typeName)

      expect(type.__isType__).toBe(true)
      expect(type.isPrimitive).toBe(true)
      expect(type.name).toBe(typeName)
    })
  })

  test('wrong type', () => {
    expect(() => createType('wrong-type')).toThrow('Cannot create type: wrong-type')
  })
})
