import createField from 'reforma/schema/Field'
import createColumn from '../Column'

describe('Column', () => {
  const field = createField('firstName')

  describe('creation', () => {
    test('simple Column', () => {
      const column = createColumn(field)

      expect(column._isColumn).toBe(true)
      expect(column.field).toBe(field)
      expect(column.caption).toBeUndefined()
      expect(column.renderer).toBeUndefined()
    })

    test('Column with override properties', () => {
      const model = {
        firstName: 'Dimitri'
      }

      const column = createColumn(field, {
        caption: 'Other caption',
        renderer: (model, field) => `Mr. ${model[field.name]}`
      })

      expect(column._isColumn).toBe(true)
      expect(column.field).toBe(field)
      expect(column.caption).toBe('Other caption')
      expect(column.renderer(model, field)).toBe('Mr. Dimitri')
    })
  })
})
