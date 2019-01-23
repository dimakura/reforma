import createField from 'reforma/schema/Field'
import { getSchema } from 'Test/factories'
import { createColumns, createColumn } from '../Column'

describe('Column', () => {
  const model = { firstName: 'Dimitri' }
  const field = createField('firstName')
  const simpleColumn = createColumn(field)
  const complexColumn = createColumn(field, {
    caption: 'Name & Salutation',
    renderer: (model) => `Mr. ${model.firstName}`
  })

  test('.createColumns', () => {
    const columns = createColumns(getSchema(), ['firstName', 'lastName', 'profession'])

    expect(columns).toHaveLength(2)
    expect(columns[0].field.name).toBe('firstName')
    expect(columns[1].field.name).toBe('lastName')
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
