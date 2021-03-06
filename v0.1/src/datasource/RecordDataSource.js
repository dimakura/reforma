import EventEmitter from 'events'
import urljoin from 'url-join'
import { getAsync } from 'reforma/api'

export const STATUS_INITIAL = 'initial'
export const STATUS_IN_PROGRESS = 'in-progress'
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'
export const EVENT_STATUS_CHANGED = 'status-changed'

class RecordDataSourceEvents extends EventEmitter {}

export default function createRecordDataSource(schema, modelId) {
  const emitter = new RecordDataSourceEvents()
  let status = STATUS_INITIAL
  let model
  let errors

  function changeStatus(newStatus) {
    const oldStatus = status
    status = newStatus

    emitter.emit(EVENT_STATUS_CHANGED, newStatus, oldStatus)
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
          model = schema.resolve(response.data.data)
          changeStatus(STATUS_SUCCESS)
        } else {
          errors = response.errors
          changeStatus(STATUS_ERROR)
        }
      })
    },

    subscribe(event, handler) {
      emitter.on(event, handler)

      return (() => {
        emitter.removeListener(event, handler)
      })
    }
  }
}
