import createField from 'reforma/schema/Field'
import { createColumn } from '../Column'

describe('Column', () => {
  const model = { firstName: 'Dimitri' }
  const field = createField('firstName')
  const simpleColumn = createColumn(field)
  const complexColumn = createColumn(field, {
    caption: 'Name & Salutation',
    renderer: (model) => `Mr. ${model.firstName}`
  })

  describe('.createColumn', () => {
    test('simple column', () => {
      expect(simpleColumn._isColumn).toBe(true)
      expect(simpleColumn.field).toBe(field)
      expect(simpleColumn.caption).toBeUndefined()
      expect(simpleColumn.renderer).toBeUndefined()
      expect(simpleColumn.getFormattedValue)
    })

    test('column with overrided properties', () => {
      expect(complexColumn._isColumn).toBe(true)
      expect(complexColumn.field).toBe(field)
      expect(complexColumn.caption).toBe('Name & Salutation')
      expect(complexColumn.renderer(model, field)).toBe('Mr. Dimitri')
    })
  })

  test('#getCaption', () => {
    expect(simpleColumn.getCaption()).toBe('First Name')
    expect(complexColumn.getCaption()).toBe('Name & Salutation')
  })

  test('#getFormattedValue', () => {
    expect(simpleColumn.getFormattedValue(model)).toBe('Dimitri')
    expect(complexColumn.getFormattedValue(model)).toBe('Mr. Dimitri')
  })
})
