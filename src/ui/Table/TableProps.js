import { get } from 'lodash'
import { createColumns } from '../Column'

export default function createTableProps(data) {
  const tableDataSource = do {
    if ('schema' in data) {
      data.schema.dataSource.tableDataSource
    } else {
      data.tableDataSource
    }
  }

  const schema = tableDataSource.schema
  const columns = createColumns(schema, data.columns)
  const perPage = data.perPage
  const showHeader = get(data, 'showHeader', true)
  const showFooter = get(data, 'showFooter', true)

  return {
    get _isTableProps() {
      return true
    },

    get schema() {
      return schema
    },

    get tableDataSource() {
      return tableDataSource
    },

    get columns() {
      return columns
    },

    get perPage() {
      return perPage
    },

    get showHeader() {
      return showHeader
    },

    get showFooter() {
      return showFooter
    }
  }
}
