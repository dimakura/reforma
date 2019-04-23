import createDate from '../date'

test('createDate', () => {
  const type = createDate()
  const type2 = createDate({
    format: 'MMM DD, YYYY'
  })

  expect(type.__isType__).toBe(true)
  expect(type.isPrimitive).toBe(true)
  expect(type.name).toBe('date')
  expect(type.format).toBe('DD-MMM-YYYY hh:mm:ss')

  expect(type2.__isType__).toBe(true)
  expect(type2.isPrimitive).toBe(true)
  expect(type2.name).toBe('date')
  expect(type2.format).toBe('MMM DD, YYYY')
})
