import { serialize } from 'reforma'
import { Map } from 'immutable'

describe('serialize', () => {
  const abstractType = Map({isType: true})
  const serializeFunction = jest.fn()
  const serializableType = Map({isType: true, serialize: serializeFunction})

  test('normal scenario', () => {
    serializeFunction.mockReturnValue('serialized')
    expect(serialize(serializableType, 1)).toBe('serialized')
    expect(serializeFunction).toHaveBeenCalledWith(1)
  })

  test('non-serializable type', () => {
    expect(() => serialize(abstractType, 1)).toThrow('Cannot serialize: no serializer function')
  })

})
