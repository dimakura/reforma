import EventEmitter from 'events'
import { getAsync } from 'reforma/api'
import urljoin from 'url-join'

export const STATUS_INITIAL = 'initial'
export const STATUS_IN_PROGRESS = 'in-progress'
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'
export const EVENT_STATUS_CHANGED = 'status-changed'

class RecordDataSourceEvents extends EventEmitter {}
const emitter = new RecordDataSourceEvents()

export default function createRecordDataSource(schema, modelId) {
  let status = STATUS_INITIAL
  let modelData // used to support cloning models
  let model
  let errors

  function changeStatus(newStatus) {
    const event = eventName(EVENT_STATUS_CHANGED, schema, modelId)
    const oldStatus = status
    status = newStatus

    emitter.emit(event, newStatus, oldStatus)
  }

  return {
    get _isRecordDataSource() {
      return true
    },

    get schema() {
      return schema
    },

    get status() {
      return status
    },

    get modelId() {
      return modelId
    },

    get model() {
      return model
    },

    get errors() {
      return errors
    },

    get isInitial() {
      return status === STATUS_INITIAL
    },

    get isInProgress() {
      return status === STATUS_IN_PROGRESS
    },

    get isSuccess() {
      return status === STATUS_SUCCESS
    },

    get isError() {
      return status === STATUS_ERROR
    },

    fetch() {
      changeStatus(STATUS_IN_PROGRESS)

      const url = do {
        if (schema.isSingleton) {
          // for singleton schema we don't need /:id ending
          schema.baseUrl
        } else {
          urljoin(schema.baseUrl, modelId.toString())
        }
      }

      return getAsync(url).then(response => {
        if (response.isSuccess) {
          modelData = response.data.data
          model = schema.resolve(modelData)
          changeStatus(STATUS_SUCCESS)
        } else {
          errors = response.errors
          changeStatus(STATUS_ERROR)
        }
      })
    },

    getClonedModel() {
      return schema.resolve(modelData)
    },

    subscribe(event, handler) {
      event = eventName(event, schema, modelId)
      emitter.on(event, handler)

      return (() => {
        emitter.removeListener(event, handler)
      })
    }
  }
}

// -- PRIVATE

// different schemas and records produce different events!
function eventName(baseName, schema, modelId) {
  return `${schema.name}:${modelId}:${baseName}`
}
