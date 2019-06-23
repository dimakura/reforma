import { isType, isPrimitiveType } from 'reforma'
import primitiveType from '../primitiveType'

test('primitive type', () => {
  expect(isType(primitiveType)).toBe(true)
  expect(isPrimitiveType(primitiveType)).toBe(true)
})
