import { Map } from 'immutable'
import { isType } from 'reforma'

describe('isType', () => {
  const abstractType = Map({isType: true})
  const invalidTypes = [null, {isType: true}, Map(), 'someType']

  test('valid type', () => {
    expect(isType(abstractType)).toBe(true)
  })

  test('invalid types', () => {
    invalidTypes.forEach((type) => {
      expect(isType(type)).toBe(false)
    })
  })
})
