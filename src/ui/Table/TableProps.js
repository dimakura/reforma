import createColumn from '../Column'

export default function createTableProps(data) {
  const schema = data.schema
  const columns = createColumns(schema, data.columns)
  const withSearchBar = data.withSearchBar
  const perPage = data.perPage
  const hasPaging = perPage != null

  return {
    get _isTableProps() {
      return true
    },

    get schema() {
      return schema
    },

    get columns() {
      return columns
    },

    get withSearchBar() {
      return withSearchBar
    },

    get perPage() {
      return perPage
    },

    get hasPaging() {
      return hasPaging
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
      columns.push(createColumn(field, data))
    }
  }

  return columns
}
