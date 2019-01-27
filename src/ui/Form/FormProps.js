import notBlank from 'reforma/utils/notBlank'
import { createColumns } from '../Column'

export default function createFormProps(data) {
  const schema = data.schema
  const modelOrId = notBlank(data.id, data.record)
  const editRecordDataSource = schema.dataSource.getEditRecordDataSource(modelOrId)
  const columns = createColumns(schema, data.columns)
  const saveText = data.saveText
  const cancelText = data.cancelText
  const onCancel = data.onCancel
  const onSuccess = data.onSuccess

  return {
    get _isFormProps() {
      return true
    },

    get schema() {
      return schema
    },

    get editRecordDataSource() {
      return editRecordDataSource
    },

    get columns() {
      return columns
    },

    get saveText() {
      return saveText
    },

    get cancelText() {
      return cancelText
    },

    get onSuccess() {
      return onSuccess
    },

    get onCancel() {
      return onCancel
    }
  }
}
