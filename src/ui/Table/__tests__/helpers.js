// TODO: move to factory!

import { createSchema } from 'reforma'
import createTableProps from '../TableProps'

export function getSchema() {
  return createSchema({
    name: 'profiles',
    url: '/profiles',
    fields: ['id', 'firstName', 'lastName']
  })
}

export function getTableProps() {
  const schema = getSchema()

  const tableProps = createTableProps({
    schema,
    columns: ['firstName', {
      name: 'lastName',
      caption: '@Last-Name@'
    }],
    perPage: 10,
    withSearchBar: true
  })

  return tableProps
}
