import createTableProps from 'reforma/ui/Table/TableProps'
import { getSchema } from './schema'

export function getTableProps() {
  const schema = getSchema()

  const tableProps = createTableProps({
    schema,
    columns: [
      'firstName', {
        name: 'lastName',
        caption: 'Last Name'
      }
    ],
    perPage: 10
  })

  return tableProps
}
