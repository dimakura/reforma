import createInteger from '../integer'

test('createInteger', () => {
  const type = createInteger()

  expect(type.__isType__).toBe(true)
  expect(type.isPrimitive).toBe(true)
  expect(type.name).toBe('integer')
})
