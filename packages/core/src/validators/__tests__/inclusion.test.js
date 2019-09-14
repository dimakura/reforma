import inclusion from '../inclusion'

const defaultInclusion = inclusion([1, 2, 3])
const customInclusion = inclusion([1, 2, 3], {
  message: 'custom message',
  allowBlank: true
})

test('inclusion validator', () => {
  expect(defaultInclusion(1)).toBeNull()
  expect(defaultInclusion(4)).toBe('not in [1, 2, 3]')
  expect(customInclusion(1)).toBeNull()
  expect(customInclusion(4)).toBe('custom message')
})
