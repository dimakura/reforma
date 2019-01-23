import { get } from 'lodash'
import { createSchema } from 'reforma'
import isPresent from 'reforma/utils/isPresent'
import { getAsync } from 'reforma/api'
import {
  default as createRecordDataSource,
  EVENT_STATUS_CHANGED
} from '../RecordDataSource'

describe('RecordDataSource', () => {
  function modelFunction(data) {
    const id = get(data, 'id')
    const firstName = get(data, 'firstName')
    const lastName = get(data, 'lastName')

    return {
      id,
      firstName,
      lastName,

      get fullName() {
        return [firstName, lastName].filter(isPresent).join(' ')
      }
    }
  }

  const schema = createSchema({
    name: 'profiles',
    url: '/profiles',
    generator: modelFunction,
    fields: ['firstName', 'lastName', 'fullName']
  })

  function mockSucccessApi() {
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
  }

  test('createRecordDataSource', () => {
    const dataSource = createRecordDataSource(schema, 1)

    expect(dataSource._isRecordDataSource).toBe(true)
    expect(dataSource.schema).toBe(schema)
    expect(dataSource.status).toBe('initial')
    expect(dataSource.isInitial).toBe(true)
    expect(dataSource.modelId).toBe(1)
    expect(dataSource.model).toBeUndefined()
    expect(dataSource.errors).toBeUndefined()
  })

  describe('#fetch', () => {
    const expectedUrl = '/profiles/1'

    test('success', async () => {
      mockSucccessApi()

      const statusListener = jest.fn()
      const dataSource = createRecordDataSource(schema, 1)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.fetch()

      expect(dataSource.isInProgress).toBe(true)
      expect(getAsync).toHaveBeenCalledWith(expectedUrl)
      expect(statusListener).toHaveBeenCalledWith('in-progress', 'initial')

      await promise

      expect(statusListener).toHaveBeenCalledWith('success', 'in-progress')
      expect(dataSource.isSuccess).toBe(true)
      expect(dataSource.model.fullName).toBe('Dimitri Kurashvili')
    })

    test('failure', async () => {
      getAsync.mockResolvedValue({
        isSuccess: false,
        errors: 'Something failed'
      })

      const statusListener = jest.fn()
      const dataSource = createRecordDataSource(schema, 1)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.fetch()

      expect(dataSource.isInProgress).toBe(true)
      expect(getAsync).toHaveBeenCalledWith(expectedUrl)
      expect(statusListener).toHaveBeenCalledWith('in-progress', 'initial')

      await promise

      expect(statusListener).toHaveBeenCalledWith('error', 'in-progress')
      expect(dataSource.isError).toBe(true)
      expect(dataSource.errors).toBe('Something failed')
    })
  })

  test('#getClonedModel', async () => {
    mockSucccessApi()

    const dataSource = createRecordDataSource(schema, 1)
    const promise = dataSource.fetch()

    const model1 = dataSource.getClonedModel()

    await promise

    const model2 = dataSource.getClonedModel()

    expect(model1.id).toBeUndefined()
    expect(model1.firstName).toBeUndefined()
    expect(model1.lastName).toBeUndefined()
    expect(model1.fullName).toBe('')

    expect(model2.id).toBe(1)
    expect(model2.firstName).toBe('Dimitri')
    expect(model2.lastName).toBe('Kurashvili')
    expect(model2.fullName).toBe('Dimitri Kurashvili')
  })
})
