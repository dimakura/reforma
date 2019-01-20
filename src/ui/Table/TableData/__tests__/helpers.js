// TODO: move to factory!

import { createSchema } from 'reforma'
import createTableProps from '../../TableProps'

export const schema = createSchema({
  url: '/profiles',
  fields: ['id', 'firstName', 'lastName']
})

export const tableProps = createTableProps({
  schema,
  columns: ['firstName', {
    name: 'lastName',
    caption: '@Last-Name@'
  }],
  perPage: 10,
  withSearchBar: true
})
