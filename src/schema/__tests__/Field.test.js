import createField from '../Field'

describe('Field', () => {
  describe('createField', () => {
    test('only name', () => {
      const field = createField('firstName')

      expect(field._isField).toBe(true)
      expect(field.name).toBe('firstName')
      expect(field.type.name).toBe('string')
      expect(field.editorProps).toBeUndefined()
    })

    test('as object', () => {
      const field = createField({
        name: 'salary',
        type: 'number',
        editorProps: {
          setting: true
        }
      })

      expect(field.name).toBe('salary')
      expect(field.type.name).toBe('number')
      expect(field.editorProps).toEqual({
        setting: true
      })
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

  test('#setValue', () => {
    const model = {}
    const field = createField('firstName')
    field.setValue(model, 'Dimitri')

    expect(model).toEqual({
      firstName: 'Dimitri'
    })
  })
})
