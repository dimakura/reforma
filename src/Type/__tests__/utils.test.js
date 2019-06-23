import { Type } from 'reforma'
import { Map } from 'immutable'

describe('type utils', () => {
  const wrongTypes = [null, {isType: true}, Map()]
  const abstractType = Map({isType: true})
  const primitiveType = Map({isType: true, isPrimitiveType: true})
  const serializeFunction = jest.fn()
  const deserializeFunction = jest.fn()
  const serializableType = Map({isType: true, serialize: serializeFunction})
  const deserializableType = Map({isType: true, deserialize: deserializeFunction})

  test('isType', () => {
    expect(Type.isType(abstractType)).toBe(true)
    expect(Type.isType(primitiveType)).toBe(true)

    wrongTypes.forEach((type) => {
      expect(Type.isType(type)).toBe(false)
    })
  })

  test('isPrimitiveType', () => {
    expect(Type.isPrimitiveType(abstractType)).toBe(false)
    expect(Type.isPrimitiveType(primitiveType)).toBe(true)

    wrongTypes.forEach((type) => {
      expect(Type.isPrimitiveType(type)).toBe(false)
    })
  })

  test('serialization', () => {
    expect(() => Type.serialize(abstractType, 1)).toThrow('Cannot serialize: no serializer function')

    serializeFunction.mockReturnValue('serialized')
    expect(Type.serialize(serializableType, 1)).toBe('serialized')
    expect(serializeFunction).toHaveBeenCalledWith(1)
  })

  test('deserialization', () => {
    expect(() => Type.deserialize(abstractType, 1)).toThrow('Cannot deserialize: no deserializer function')

    deserializeFunction.mockReturnValue('deserialized')
    expect(Type.deserialize(deserializableType, 1)).toBe('deserialized')
    expect(deserializeFunction).toHaveBeenCalledWith(1)
  })
})
