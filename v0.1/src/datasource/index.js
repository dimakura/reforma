import isPresent from 'reforma/utils/isPresent'
import createTableDataSource from './TableDataSource'
import createRecordDataSource from './RecordDataSource'
import createEditRecordDataSource from './EditRecordDataSource'

export default function createDataSource(schema) {
  const tableDataSource = do {
    if (!schema.isSingleton) {
      createTableDataSource(schema)
    }
  }

  const recordDataSources = {}

  return {
    get _isDataSource() {
      return true
    },

    get schema() {
      return schema
    },

    get tableDataSource() {
      return tableDataSource
    },

    getRecordDataSource(modelOrId) {
      const modelId = do {
        if (!schema.isSingleton) {
          getRecordId(modelOrId).toString()
        }
      }

      if (!(modelId in recordDataSources)) {
        recordDataSources[modelId] = createRecordDataSource(schema, modelId)
      }

      return recordDataSources[modelId]
    },

    getEditRecordDataSource(modelOrId) {
      const modelId = do {
        if (!schema.isSingleton && isPresent(modelOrId)) {
          getRecordId(modelOrId).toString()
        }
      }

      return createEditRecordDataSource(schema, modelId)
    },

    getSelectorDataSource() {
      if (!schema.isSingleton) {
        return createTableDataSource(schema)
      }
    }
  }
}

// -- PRIVATE

function getRecordId(modelOrId) {
  return do {
    if (typeof modelOrId === 'number') {
      modelOrId
    } else if (typeof modelOrId === 'string') {
      modelOrId
    } else if (modelOrId != null && typeof modelOrId === 'object'){
      modelOrId.id
    }
  }
}
