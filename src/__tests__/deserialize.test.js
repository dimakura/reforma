import { deserialize } from 'reforma'
import { Map } from 'immutable'
import * as Registry from '../registry'

describe('deserialize', () => {
  const abstractType = Map({isType: true})
  const deserializeFunction = jest.fn()
  const deserializableType = Map({isType: true, deserialize: deserializeFunction})

  test('normal scenario', () => {
    deserializeFunction.mockReturnValue('deserialized')

    expect(deserialize(deserializableType, 1)).toBe('deserialized')
    expect(deserializeFunction).toHaveBeenCalledWith(1)
  })

  test('type lookup using registry', () => {
    Registry.getType = jest.fn(() => deserializableType)
    deserializeFunction.mockReturnValue('deserialized')

    expect(deserialize('myType', 1)).toBe('deserialized')
    expect(deserializeFunction).toHaveBeenCalledWith(1)
    expect(Registry.getType).toHaveBeenCalledWith('myType')
  })

  test('non-deserializable type', () => {
    expect(() => deserialize(abstractType, 1)).toThrow('Cannot deserialize: no deserializer function')
  })
})
