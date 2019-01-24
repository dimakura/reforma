import { getSchema } from 'Test/factories'
import { getAsync } from 'reforma/api'
import {
  default as createEditRecordDataSource,
  EVENT_STATUS_CHANGED
} from '../EditRecordDataSource'

describe('EditRecordDataSource', () => {
  const schema = getSchema()

  describe('createEditRecordDataSource', () => {
    test('new model', () => {
      const dataSource = createEditRecordDataSource(schema)

      expect(dataSource._isEditRecordDataSource).toBe(true)
      expect(dataSource.schema).toBe(schema)
      expect(dataSource.isNew).toBe(true)
      expect(dataSource.recordDataSource).toBeUndefined()
    })

    test('exising model', () => {
      const dataSource = createEditRecordDataSource(schema, 1)

      expect(dataSource._isEditRecordDataSource).toBe(true)
      expect(dataSource.schema).toBe(schema)
      expect(dataSource.isNew).toBe(false)
      expect(dataSource.recordDataSource._isRecordDataSource).toBe(true)
      expect(dataSource.recordDataSource.modelId).toBe('1')
      expect(dataSource.status).toBe('initial')
      expect(dataSource.isInitial).toBe(true)
    })
  })

  describe('#fetchRecord', () => {
    test('new model', () => {
      const statusListener = jest.fn()
      const dataSource = createEditRecordDataSource(schema)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      dataSource.fetchRecord()

      expect(statusListener).toHaveBeenCalledWith('fetching', 'initial')
      expect(statusListener).toHaveBeenCalledWith('ready', 'fetching')
      expect(dataSource.isReady).toBe(true)
      expect(dataSource.model).toMatchObject({
        id: undefined,
        firstName: undefined,
        lastName: undefined
      })
    })

    test('existing model', async () => {
      getAsync.mockResolvedValue({
        isSuccess: true,
        data: {
          data: {
            id: 1,
            firstName: 'Dimitri',
            lastName: 'Kurashvili'
          }
        }
      })

      const statusListener = jest.fn()
      const dataSource = createEditRecordDataSource(schema, 1)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.fetchRecord()

      expect(dataSource.isFetching).toBe(true)
      expect(statusListener).toHaveBeenCalledWith('fetching', 'initial')

      await promise

      expect(dataSource.isReady).toBe(true)
      expect(statusListener).toHaveBeenCalledWith('ready', 'fetching')
    })

    test('existing model: failure', async () => {
      getAsync.mockResolvedValue({
        isSuccess: false,
        errors: 'Something failed'
      })

      const statusListener = jest.fn()
      const dataSource = createEditRecordDataSource(schema, 1)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.fetchRecord()

      expect(dataSource.isFetching).toBe(true)
      expect(statusListener).toHaveBeenCalledWith('fetching', 'initial')

      await promise

      expect(statusListener).toHaveBeenCalledWith('fetch-error', 'fetching')
      expect(dataSource.isFetchError).toBe(true)
      expect(dataSource.recordDataSource.errors).toBe('Something failed')
    })
  })

  describe('#save', () => {
    // TODO!
  })
})
