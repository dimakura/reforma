import isBlank from '../isBlank'
import isPresent from '../isPresent'

describe('Presence', () => {
  test('empty values', () => {
    [null, undefined, false, '', ' ', [], {}].forEach((value) => {
      expect(isBlank(value)).toBe(true)
      expect(isPresent(value)).toBe(false)
    })
  })

  test('non empty values', () => {
    [0, 1, '1', { a: 1 }, [1, 2, 3], new Date()].forEach((value) => {
      expect(isBlank(value)).toBe(false)
      expect(isPresent(value)).toBe(true)
    })
  })
})
