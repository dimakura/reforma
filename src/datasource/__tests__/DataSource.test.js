import { createSchema } from 'reforma'
import createDataSource from 'reforma/datasource'

describe('DataSource', () => {
  describe('creation', () => {
    test('with normal schema', () => {
      const schema = createSchema({
        name: 'profiles',
        url: '/profiles',
        fields: ['id', 'firstName', 'lastName']
      })
      const dataSource = createDataSource(schema)
      const recordDataSource = dataSource.getRecordDataSource(1)

      expect(dataSource.schema).toBe(schema)
      expect(dataSource.tableDataSource).toBeDefined()
      expect(recordDataSource.modelId).toBe('1')
    })

    test('with singleton schema', () => {
      const schema = createSchema({
        name: 'profiles',
        url: '/profiles',
        fields: ['id', 'firstName', 'lastName'],
        singleton: true
      })
      const dataSource = createDataSource(schema)
      const recordDataSource = dataSource.getRecordDataSource(1)

      expect(dataSource.schema).toBe(schema)
      expect(dataSource.tableDataSource).toBeUndefined()
      expect(recordDataSource.modelId).toBeUndefined()

    })
  })
})
