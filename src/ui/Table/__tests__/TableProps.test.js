import { createSchema } from 'reforma'
import createTableProps from '../TableProps'

describe('TableProps', () => {
  const schema = createSchema({
    url: '/profiles',
    fields: ['id', 'firstName', 'lastName']
  })

  test('createTableProps', () => {
    const props = createTableProps({
      schema,
      columns: ['firstName', 'fullName'],
      withSearchBar: true,
      perPage: 10
    })

    expect(props.schema).toBe(schema)
    expect(props._isTableProps).toBe(true)
    expect(props.columns).toHaveLength(1) // no fullName!
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.withSearchBar).toBe(true)
    expect(props.perPage).toBe(10)
    expect(props.hasPaging).toBe(true)
  })
})
