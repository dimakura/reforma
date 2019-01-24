import { getSchema } from 'Test/factories'
import { getAsync, postAsync, putAsync } from 'reforma/api'
import {
  default as createEditRecordDataSource,
  EVENT_STATUS_CHANGED
} from '../EditRecordDataSource'

describe('EditRecordDataSource', () => {
  const schema = getSchema()

  const data = {
    data: {
      id: 1,
      firstName: 'Dimitri',
      lastName: 'Kurashvili'
    }
  }

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
        data
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
    test('new model', async () => {
      postAsync.mockResolvedValue({
        isSuccess: true,
        data
      })

      const statusListener = jest.fn()
      const dataSource = createEditRecordDataSource(schema)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.save({
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      })

      expect(dataSource.isSaving)
      expect(postAsync).toHaveBeenCalledWith('/profiles', {
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      })

      await promise

      expect(dataSource.isSuccess).toBe(true)
      expect(dataSource.model).toMatchObject(data.data)
      expect(statusListener).toHaveBeenCalledWith('success', 'saving')
    })

    test('existing model', async () => {
      putAsync.mockResolvedValue({
        isSuccess: true,
        data
      })

      const statusListener = jest.fn()
      const dataSource = createEditRecordDataSource(schema, 1)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.save({
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      })

      expect(dataSource.isSaving)
      expect(putAsync).toHaveBeenCalledWith('/profiles/1', {
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      })

      await promise

      expect(dataSource.isSuccess).toBe(true)
      expect(dataSource.model).toMatchObject(data.data)
      expect(statusListener).toHaveBeenCalledWith('success', 'saving')
    })

    test('failure', async () => {
      putAsync.mockResolvedValue({
        isSuccess: false,
        errors: 'Something failed'
      })

      const statusListener = jest.fn()
      const dataSource = createEditRecordDataSource(schema, 1)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.save({
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      })

      expect(dataSource.isSaving)
      expect(putAsync).toHaveBeenCalledWith('/profiles/1', {
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      })

      await promise

      expect(dataSource.isError).toBe(true)
      expect(dataSource.errors).toBe('Something failed')
      expect(statusListener).toHaveBeenCalledWith('error', 'saving')
    })
  })
})
