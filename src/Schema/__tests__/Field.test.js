import { createField } from 'reforma'

describe('Field', () => {
  describe('createField', () => {
    test('only name', () => {
      const field = createField('firstName')

      expect(field.name).toBe('firstName')
      expect(field.type.name).toBe('string')
    })

    test('as object', () => {
      const field = createField({
        name: 'salary',
        type: 'number'
      })

      expect(field.name).toBe('salary')
      expect(field.type.name).toBe('number')
    })

    test('is not created on wrong data', () => {
      expect(createField(null)).toBeUndefined()
    })
  })

  test('#getValue', () => {
    const model = { firstName: 'Dimitri' }
    const field = createField('firstName')

    expect(field.getValue(model)).toBe('Dimitri')
    expect(field.getFormattedValue(model)).toBe('Dimitri')
  })
})
