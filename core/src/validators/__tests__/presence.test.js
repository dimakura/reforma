import presence from '../presence'

const field = null
const defaultPresence = presence()
const customPresence = presence('custom message')

test('presence validator', () => {
  expect(defaultPresence(field, null)).toBe('cannot be empty')
  expect(defaultPresence(field, '')).toBe('cannot be empty')
  expect(defaultPresence(field, [])).toBe('cannot be empty')
  expect(customPresence(field, null)).toBe('custom message')
  expect(customPresence(field, '')).toBe('custom message')
  expect(customPresence(field, [])).toBe('custom message')
  expect(defaultPresence(field, 1)).toBeNull()
  expect(customPresence(field, 1)).toBeNull()
})
