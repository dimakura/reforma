import notBlank from '../notBlank'

test('notBlank', () => {
  expect(notBlank(1, 2, 3)).toBe(1)
  expect(notBlank(null, 2, 3)).toBe(2)
  expect(notBlank(null, '', 3)).toBe(3)
})
