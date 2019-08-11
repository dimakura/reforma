import notBlank from 'reforma/utils/notBlank'
import { createColumns } from '../Column'

export default function createViewProps(data) {
  const schema = data.schema
  const modelOrId = notBlank(data.id, data.record)
  const recordDataSource = schema.dataSource.getRecordDataSource(modelOrId)
  const columns = createColumns(schema, data.columns)

  return {
    get _isViewProps() {
      return true
    },

    get schema() {
      return schema
    },

    get recordDataSource() {
      return recordDataSource
    },

    get columns() {
      return columns
    }
  }
}
