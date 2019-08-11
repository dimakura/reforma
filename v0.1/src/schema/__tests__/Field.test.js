import createField from '../Field'
import { getSchema } from 'Test/factories'

describe('Field', () => {
  describe('createField', () => {
    test('only name', () => {
      const field = createField('firstName')

      expect(field._isField).toBe(true)
      expect(field.name).toBe('firstName')
      expect(field.submitName).toBe('firstName')
      expect(field.type.name).toBe('string')
      expect(field.editorProps).toBeUndefined()
      expect(field.suffix).toBeUndefined()
      expect(field.prefix).toBeUndefined()
    })

    test('as object', () => {
      const field = createField({
        name: 'salary',
        type: 'number',
        editorProps: {
          setting: true
        },
        suffix: 'GEL',
        prefix: 'Anual'
      })

      expect(field.name).toBe('salary')
      expect(field.submitName).toBe('salary')
      expect(field.type.name).toBe('number')
      expect(field.editorProps).toEqual({
        setting: true
      })
      expect(field.suffix).toBe('GEL')
      expect(field.prefix).toBe('Anual')
    })

    test('is not created on wrong data', () => {
      expect(createField(null)).toBeUndefined()
    })

    test('schema field', () => {
      const schema = getSchema()
      const field = createField({
        name: 'profile',
        type: schema
      })

      expect(field.name).toBe('profile')
      expect(field.submitName).toBe('profileId')
    })
  })

  test('#getValue', () => {
    const model = { firstName: 'Dimitri' }
    const field = createField('firstName')

    expect(field.getValue(model)).toBe('Dimitri')
    expect(field.getFormattedValue(model)).toBe('Dimitri')
    expect(field.getSubmitValue(model)).toBe('Dimitri')
  })

  test('#setValue', () => {
    const model = {}
    const field = createField('firstName')
    field.setValue(model, 'Dimitri')

    expect(model).toEqual({
      firstName: 'Dimitri'
    })
  })

  test('#getSubmitValue', () => {
    const model = {
      profile: {
        id: 1,
        firstName: 'Dimitri'
      }
    }
    const schema = getSchema()
    const field = createField({
      name: 'profile',
      type: schema
    })

    expect(field.getSubmitValue(model)).toBe(1)
  })
})
