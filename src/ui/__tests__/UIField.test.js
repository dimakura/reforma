import createField from 'reforma/schema/Field'
import createUIField from '../UIField'

describe('UIField', () => {
  const field = createField('firstName')

  describe('creation', () => {
    test('simple UIField', () => {
      const uiField = createUIField(field)

      expect(uiField.field).toBe(field)
      expect(uiField.caption).toBeUndefined()
      expect(uiField.renderer).toBeUndefined()
    })

    test('UIField with override properties', () => {
      const model = {
        firstName: 'Dimitri'
      }

      const uiField = createUIField(field, {
        caption: 'Other caption',
        renderer: (model, field) => `Mr. ${model[field.name]}`
      })

      expect(uiField.field).toBe(field)
      expect(uiField.caption).toBe('Other caption')
      expect(uiField.renderer(model, field)).toBe('Mr. Dimitri')
    })
  })
})
