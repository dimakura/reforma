import { createSchema } from 'reforma'
import createTableProps from '../TableProps'
import { getSchema } from './helpers'

describe('TableProps', () => {
  test('createTableProps', () => {
    const schema = getSchema()
    const props = createTableProps({
      schema,
      columns: [{
        name: 'firstName',
        caption: 'Name'
      }, 'fullName'],
      withSearchBar: true,
      perPage: 10
    })

    expect(props.schema).toBe(schema)
    expect(props._isTableProps).toBe(true)
    expect(props.columns).toHaveLength(1) // no fullName!
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.columns[0].caption).toBe('Name')
    expect(props.withSearchBar).toBe(true)
    expect(props.perPage).toBe(10)
  })
})
