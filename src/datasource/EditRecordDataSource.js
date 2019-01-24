import EventEmitter from 'events'
import urljoin from 'url-join'
import { postAsync, putAsync } from 'reforma/api'
import isBlank from 'reforma/utils/isBlank'

export const STATUS_INITIAL = 'initial'
export const STATUS_FETCHING = 'fetching'
export const STATUS_FETCH_ERROR = 'fetch-error'
export const STATUS_READY = 'ready'
export const STATUS_SAVING = 'saving'
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'
export const EVENT_STATUS_CHANGED = 'status-changed'

class EditRecordDataSourceEvents extends EventEmitter {}

export default function createEditRecordDataSource(schema, modelId) {
  const emitter = new EditRecordDataSourceEvents()
  const isNew = isBlank(modelId)
  let status = STATUS_INITIAL
  let errors
  let model
  const recordDataSource = do {
    if (!isNew) {
      schema.dataSource.getRecordDataSource(modelId)
    }
  }

  function changeStatus(newStatus) {
    const oldStatus = status
    status = newStatus

    emitter.emit(EVENT_STATUS_CHANGED, newStatus, oldStatus)
  }

  return {
    get _isEditRecordDataSource() {
      return true
    },

    get schema() {
      return schema
    },

    get recordDataSource() {
      return recordDataSource
    },

    get isNew() {
      return isNew
    },

    get status() {
      return status
    },

    get isInitial() {
      return status === STATUS_INITIAL
    },

    get isFetching() {
      return status === STATUS_FETCHING
    },

    get isFetchError() {
      return status === STATUS_FETCH_ERROR
    },

    get isReady() {
      return status === STATUS_READY
    },

    get isSaving() {
      return status === STATUS_SAVING
    },

    get isSuccess() {
      return status === STATUS_SUCCESS
    },

    get isError() {
      return status === STATUS_ERROR
    },

    get model() {
      return model
    },

    get errors() {
      return errors
    },

    fetchRecord () {
      changeStatus(STATUS_FETCHING)

      if (isNew) {
        model = schema.resolve()
        changeStatus(STATUS_READY)

        return
      } else {
        return recordDataSource.fetch().then(() => {
          if (recordDataSource.isSuccess) {
            model = recordDataSource.model
            changeStatus(STATUS_READY)
          } else {
            changeStatus(STATUS_FETCH_ERROR)
          }
        })
      }
    },

    save(data) {
      changeStatus(STATUS_SAVING)

      const url = do {
        if (isNew || schema.isSingleton) {
          schema.baseUrl
        } else {
          urljoin(schema.baseUrl, recordDataSource.modelId.toString())
        }
      }

      const apiFn = do {
        if (isNew) {
          postAsync
        } else {
          putAsync
        }
      }

      return apiFn(url, data).then(response => {
        if (response.isSuccess) {
          model = schema.resolve(response.data.data)
          changeStatus(STATUS_SUCCESS)

          // TODO: invalidate (set to INITIAL)
          // table & record data sources
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
