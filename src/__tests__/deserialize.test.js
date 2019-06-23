import { deserialize } from 'reforma'
import { Map } from 'immutable'

describe('deserialize', () => {
  const abstractType = Map({isType: true})
  const deserializeFunction = jest.fn()
  const deserializableType = Map({isType: true, deserialize: deserializeFunction})

  test('normal scenario', () => {
    deserializeFunction.mockReturnValue('deserialized')
    expect(deserialize(deserializableType, 1)).toBe('deserialized')
    expect(deserializeFunction).toHaveBeenCalledWith(1)
  })

  test('non-deserializable type', () => {
    expect(() => deserialize(abstractType, 1)).toThrow('Cannot deserialize: no deserializer function')
  })
})
