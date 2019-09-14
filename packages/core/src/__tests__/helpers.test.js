import { snakeCase } from '../helpers'

describe('helpers', () => {
  test('snakeCase', () => {
    expect(snakeCase('firstName')).toBe('first_name')
    expect(snakeCase('_page')).toBe('_page')
    expect(snakeCase('_perPage')).toBe('_per_page')
  })
})
