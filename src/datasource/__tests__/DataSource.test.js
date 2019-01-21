import { createSchema } from 'reforma'
import createDataSource from '..'

describe('DataSource', () => {
  describe('creation', () => {
    test('with normal schema', () => {
      const schema = createSchema({
        name: 'profiles',
        url: '/profiles',
        fields: ['id', 'firstName', 'lastName']
      })

      const dataSource = createDataSource(schema)

      expect(dataSource.schema).toBe(schema)
      expect(dataSource.tableDataSource).toBeDefined()
    })

    test('with singleton schema', () => {
      const schema = createSchema({
        name: 'profiles',
        url: '/profiles',
        fields: ['id', 'firstName', 'lastName'],
        singleton: true
      })
      const dataSource = createDataSource(schema)

      expect(dataSource.schema).toBe(schema)
      expect(dataSource.tableDataSource).toBeUndefined()
    })
  })
})
