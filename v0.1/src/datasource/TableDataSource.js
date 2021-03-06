import EventEmitter from 'events'
import { getAsync } from 'reforma/api'
import buildUrl from 'reforma/utils/buildUrl'

export const STATUS_INITIAL = 'initial'
export const STATUS_IN_PROGRESS = 'in-progress'
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'
export const EVENT_PARAMS_CHANGED = 'params-changed'
export const EVENT_STATUS_CHANGED = 'status-changed'

class TableDataSourceEvents extends EventEmitter {}

export default function createTableDataSource(schema) {
  const emitter = new TableDataSourceEvents()
  let status = STATUS_INITIAL
  let params
  let data
  let total = 0
  let errors

  function changeParams(newParams) {
    const oldParams = params
    params = newParams

    emitter.emit(EVENT_PARAMS_CHANGED, newParams, oldParams)
  }

  function changeStatus(newStatus) {
    const oldStatus = status
    status = newStatus

    emitter.emit(EVENT_STATUS_CHANGED, newStatus, oldStatus)
  }

  return {
    get _isTableDataSource() {
      return true
    },

    get schema() {
      return schema
    },

    get status() {
      return status
    },

    get params() {
      return params
    },

    get data() {
      return data
    },

    get total() {
      return total
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

    fetch(params) {
      changeParams(params)
      changeStatus(STATUS_IN_PROGRESS)
      const url = buildUrl(schema.baseUrl, params)

      return getAsync(url).then(response => {
        if (response.isSuccess) {
          data = response.data.data.map(schema.resolve)
          total = parseInt(response.data.total, 10)
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
    },

    resetData() {
      data = null
      total = 0
      status = STATUS_INITIAL
    }
  }
}
