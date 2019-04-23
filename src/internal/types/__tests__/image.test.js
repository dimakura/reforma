import createImage from '../image'

test('createImage', () => {
  const type = createImage()

  expect(type.__isType__).toBe(true)
  expect(type.isPrimitive).toBe(true)
  expect(type.name).toBe('image')
})
