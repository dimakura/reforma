import createFloat from '../float'

test('createFloat', () => {
  const type = createFloat()
  const type2 = createFloat({
    decimals: 3
  })

  expect(type.__isType__).toBe(true)
  expect(type.isPrimitive).toBe(true)
  expect(type.name).toBe('float')
  expect(type.decimals).toBe(2)

  expect(type2.__isType__).toBe(true)
  expect(type2.isPrimitive).toBe(true)
  expect(type2.name).toBe('float')
  expect(type2.decimals).toBe(3)
})
