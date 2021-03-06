import { get } from 'lodash'
import { createSchema } from 'reforma'
import isPresent from 'reforma/utils/isPresent'
import { getAsync } from 'reforma/api'
import {
  default as createTableDataSource,
  EVENT_PARAMS_CHANGED,
  EVENT_STATUS_CHANGED
} from '../TableDataSource'

describe('TableDataSource', () => {
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

  test('createTableDataSource', () => {
    const dataSource = createTableDataSource(schema)

    expect(dataSource._isTableDataSource).toBe(true)
    expect(dataSource.schema).toBe(schema)
    expect(dataSource.isInitial).toBe(true)
    expect(dataSource.params).toBeUndefined()
    expect(dataSource.data).toBeUndefined()
    expect(dataSource.errors).toBeUndefined()
  })

  describe('#fetch', () => {
    const expectedUrl = '/profiles?page=1&per_page=10'
    const params = {
      page: 1,
      perPage: 10
    }

    test('success', async () => {
      getAsync.mockResolvedValue({
        isSuccess: true,
        data: {
          data: [{
            id: 1,
            firstName: 'Dimitri',
            lastName: 'Kurashvili'
          }],
          total: 100
        }
      })

      const paramsListener = jest.fn()
      const statusListener = jest.fn()
      const dataSource = createTableDataSource(schema)
      dataSource.subscribe(EVENT_PARAMS_CHANGED, paramsListener)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.fetch(params)

      expect(dataSource.isInProgress).toBe(true)
      expect(dataSource.params).toEqual({ page: 1, perPage: 10 })
      expect(getAsync).toHaveBeenCalledWith(expectedUrl)
      expect(statusListener).toHaveBeenCalledWith('in-progress', 'initial')
      expect(paramsListener).toHaveBeenCalledWith(params, undefined)

      await promise

      expect(statusListener).toHaveBeenCalledWith('success', 'in-progress')
      expect(dataSource.isSuccess).toBe(true)
      expect(dataSource.data[0].fullName).toBe('Dimitri Kurashvili')
      expect(dataSource.total).toBe(100)
    })

    test('failure', async () => {
      getAsync.mockResolvedValue({
        isSuccess: false,
        errors: 'Something failed'
      })

      const paramsListener = jest.fn()
      const statusListener = jest.fn()
      const dataSource = createTableDataSource(schema)
      dataSource.subscribe(EVENT_PARAMS_CHANGED, paramsListener)
      dataSource.subscribe(EVENT_STATUS_CHANGED, statusListener)

      const promise = dataSource.fetch(params)

      expect(dataSource.isInProgress).toBe(true)
      expect(getAsync).toHaveBeenCalledWith(expectedUrl)
      expect(statusListener).toHaveBeenCalledWith('in-progress', 'initial')
      expect(paramsListener).toHaveBeenCalledWith(params, undefined)

      await promise

      expect(statusListener).toHaveBeenCalledWith('error', 'in-progress')
      expect(dataSource.isError).toBe(true)
      expect(dataSource.errors).toBe('Something failed')
    })
  })

  test('#resetData', async () => {
    getAsync.mockResolvedValue({
      isSuccess: true,
      data: {
        data: [{
          id: 1,
          firstName: 'Dimitri',
          lastName: 'Kurashvili'
        }],
        total: 100
      }
    })

    const dataSource = createTableDataSource(schema)
    await dataSource.fetch({})

    expect(dataSource.isSuccess).toBe(true)
    expect(dataSource.data).toHaveLength(1)
    expect(dataSource.total).toBe(100)

    dataSource.resetData()

    expect(dataSource.isInitial).toBe(true)
    expect(dataSource.data).toBeNull()
    expect(dataSource.total).toBe(0)
  })
})
