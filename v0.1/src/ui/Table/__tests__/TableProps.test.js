import { getSchema } from 'Test/factories'
import createTableProps from '../TableProps'

describe('TableProps', () => {
  test('createTableProps', () => {
    const schema = getSchema()
    const props = createTableProps({
      schema,
      columns: [{
        name: 'firstName',
        caption: 'Name'
      }, 'age'],
      perPage: 10,
      fetchParams: {
        isAdmin: true
      }
    })

    expect(props.schema).toBe(schema)
    expect(props._isTableProps).toBe(true)
    expect(props.columns).toHaveLength(1) // age is not recognized as a column
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.columns[0].caption).toBe('Name')
    expect(props.perPage).toBe(10)
    expect(props.showHeader).toBe(true)
    expect(props.showFooter).toBe(true)
    expect(props.fetchParams).toEqual({
      isAdmin: true
    })
  })
})
