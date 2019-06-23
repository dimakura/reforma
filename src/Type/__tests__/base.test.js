import baseType from '../base'
import { Type } from 'reforma'

test('base type', () => {
  expect(Type.isType(baseType)).toBe(true)
})
