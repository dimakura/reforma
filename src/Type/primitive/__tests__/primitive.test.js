import { Type } from 'reforma'
import primitiveType from '../primitive'

test('primitive type', () => {
  expect(Type.isType(primitiveType)).toBe(true)
  expect(Type.isPrimitiveType(primitiveType)).toBe(true)
})
