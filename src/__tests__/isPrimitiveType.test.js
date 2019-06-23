import { Map } from 'immutable'
import { isPrimitiveType } from 'reforma'

describe('isPrimitiveType', () => {
  const abstractType = Map({isType: true})
  const primitiveType = Map({isType: true, isPrimitiveType: true})
  const invalidTypes = [null, {isType: true}, Map(), 'someType']

  test('abstract type', () => {
    expect(isPrimitiveType(abstractType)).toBe(false)
  })

  test('primitive type', () => {
    expect(isPrimitiveType(primitiveType)).toBe(true)
  })

  test('invalid types', () => {
    invalidTypes.forEach((type) => {
      expect(isPrimitiveType(type)).toBe(false)
    })
  })
})
