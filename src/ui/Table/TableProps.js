import { createColumns } from '../Column'

export default function createTableProps(data) {
  const schema = data.schema
  const tableDataSource = schema.dataSource.tableDataSource
  const columns = createColumns(schema, data.columns)
  const perPage = data.perPage

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
    }
  }
}
