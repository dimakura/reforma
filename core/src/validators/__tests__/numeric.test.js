import {
  greaterThan,
  greaterOrEqualTo,
  lessThan,
  lessOrEqualTo
} from '../numeric'

describe('numeric validators', () => {
  test('greaterThan', () => {
    const defaultValidator = greaterThan(0)
    const blankValidator = greaterThan(0, { allowBlank: true })
    const messageValidator = greaterThan(0, { message: 'custom message' })

    expect(defaultValidator(-1)).toBe('should be greater than 0')
    expect(defaultValidator(0)).toBe('should be greater than 0')
    expect(defaultValidator(1)).toBeNull()
    expect(messageValidator(-1)).toBe('custom message')
    expect(messageValidator(0)).toBe('custom message')
    expect(messageValidator(1)).toBeNull()

    expect(defaultValidator(null)).toBe('not a number')
    expect(blankValidator(null)).toBeNull()
  })

  test('greaterOrEqualTo', () => {
    const defaultValidator = greaterOrEqualTo(0)
    const blankValidator = greaterOrEqualTo(0, { allowBlank: true })
    const messageValidator = greaterOrEqualTo(0, { message: 'custom message' })

    expect(defaultValidator(-1)).toBe('should be greater or equal to 0')
    expect(defaultValidator(0)).toBeNull()
    expect(defaultValidator(1)).toBeNull()
    expect(messageValidator(-1)).toBe('custom message')
    expect(defaultValidator(0)).toBeNull()
    expect(messageValidator(1)).toBeNull()

    expect(defaultValidator(null)).toBe('not a number')
    expect(blankValidator(null)).toBeNull()
  })

  test('lessThan', () => {
    const defaultValidator = lessThan(0)
    const blankValidator = lessThan(0, { allowBlank: true })
    const messageValidator = lessThan(0, { message: 'custom message' })

    expect(defaultValidator(-1)).toBeNull()
    expect(defaultValidator(0)).toBe('should be less than 0')
    expect(defaultValidator(1)).toBe('should be less than 0')
    expect(messageValidator(0)).toBe('custom message')
    expect(messageValidator(1)).toBe('custom message')
    expect(messageValidator(-1)).toBeNull()

    expect(defaultValidator(null)).toBe('not a number')
    expect(blankValidator(null)).toBeNull()
  })

  test('lessOrEqualTo', () => {
    const defaultValidator = lessOrEqualTo(0)
    const blankValidator = lessOrEqualTo(0, { allowBlank: true })
    const messageValidator = lessOrEqualTo(0, { message: 'custom message' })

    expect(defaultValidator(-1)).toBeNull()
    expect(defaultValidator(0)).toBeNull()
    expect(defaultValidator(1)).toBe('should be less or equal to 0')
    expect(messageValidator(-1)).toBeNull()
    expect(defaultValidator(0)).toBeNull()
    expect(messageValidator(1)).toBe('custom message')

    expect(defaultValidator(null)).toBe('not a number')
    expect(blankValidator(null)).toBeNull()
  })
})
