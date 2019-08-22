import presence from '../presence'

const defaultPresence = presence()
const customPresence = presence({ message: 'custom message' })

test('presence validator', () => {
  expect(defaultPresence(null)).toBe('cannot be empty')
  expect(defaultPresence('')).toBe('cannot be empty')
  expect(defaultPresence([])).toBe('cannot be empty')
  expect(customPresence(null)).toBe('custom message')
  expect(customPresence('')).toBe('custom message')
  expect(customPresence([])).toBe('custom message')
  expect(defaultPresence(1)).toBeNull()
  expect(customPresence(1)).toBeNull()
})
