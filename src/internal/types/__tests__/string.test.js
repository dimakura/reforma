import createString from '../string'

test('createString', () => {
  const type = createString()

  expect(type.__isType__).toBe(true)
  expect(type.isPrimitive).toBe(true)
  expect(type.name).toBe('string')
})
