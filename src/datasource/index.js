import createTableDataSource from './TableDataSource'

export default function createDataSource(schema) {
  const tableDataSource = do {
    if (!schema.isSingleton) {
      createTableDataSource(schema)
    }
  }

  return {
    get _isDataSource() {
      return true
    },

    get schema() {
      return schema
    },

    get tableDataSource() {
      return tableDataSource
    }
  }
}
