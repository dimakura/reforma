import createColumn from '../Column'

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

// -- PRIVATE

function createColumns(schema, data) {
  const columns = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]

    const field = do {
      if (typeof row === 'string') {
        schema.fieldsByName[row]
      } else if (typeof row === 'object' && 'name' in row) {
        schema.fieldsByName[row.name]
      }
    }

    if (field != null) {
      columns.push(createColumn(field, row))
    }
  }

  return columns
}