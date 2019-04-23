import createBool from '../bool'

test('createBool', () => {
  const type = createBool()

  expect(type.__isType__).toBe(true)
  expect(type.isPrimitive).toBe(true)
  expect(type.name).toBe('bool')
})
