import { isType } from 'reforma'
import baseType from '../baseType'

test('base type', () => {
  expect(isType(baseType)).toBe(true)
})
