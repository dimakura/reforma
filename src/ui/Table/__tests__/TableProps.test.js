import { createSchema } from 'reforma'
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
      perPage: 10
    })

    expect(props.schema).toBe(schema)
    expect(props._isTableProps).toBe(true)
    expect(props.columns).toHaveLength(1) // no age!
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.columns[0].caption).toBe('Name')
    expect(props.perPage).toBe(10)
  })
})
