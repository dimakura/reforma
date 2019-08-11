import { get } from 'lodash'
import { createSchema } from 'reforma'

describe('Schema', () => {
  function createProfile(data) {
    const id = get(data, 'id')
    const firstName = get(data, 'firstName')
    const lastName = get(data, 'lastName')

    return {
      id,
      firstName,
      lastName,
      get fullName() {
        return [firstName, lastName].join(' ')
      }
    }
  }

  const data = {
    name: 'profiles',
    baseUrl: '/profiles',
    fields: ['id', 'firstName', 'lastName']
  }

  describe('createSchema', () => {
    test('normal schema', () => {
      const schema = createSchema(data)

      expect(schema._isSchema).toBe(true)
      expect(schema.name).toBe('profiles')
      expect(schema.fields).toHaveLength(3)
      expect(schema.fields[0].name).toBe('id')
      expect(schema.fields[1].name).toBe('firstName')
      expect(schema.fields[2].name).toBe('lastName')
      expect(schema.fieldsByName).toEqual({
        id: expect.objectContaining({ _isField: true, name: 'id' }),
        firstName: expect.objectContaining({ _isField: true, name: 'firstName' }),
        lastName: expect.objectContaining({ _isField: true, name: 'lastName' })
      })
      expect(schema.modelGenerator).toBeUndefined()
      expect(schema.baseUrl).toBe('/profiles')
      expect(schema.isSingleton).toBe(false)
      expect(schema.dataSource._isDataSource).toBe(true)
    })

    test('singleton schema', () => {
      const schema = createSchema({
        ...data,
        singleton: true
      })

      expect(schema.isSingleton).toBe(true)
      expect(schema.getUrl()).toBe('/profiles')
      expect(schema.getModelUrl(1)).toBe('/profiles')
    })

    test('wrong schemas', () => {
      expect(() => createSchema({ ...data, name: null })).toThrow('Empty schema name')
      expect(() => createSchema({ ...data, baseUrl: null })).toThrow('Specify schema url')
      expect(() => createSchema({ ...data, fields: [] })).toThrow('Wrong schema fields: ')
    })

    test('duplicate schema name', () => {
      createSchema(data)
      expect(() => createSchema(data)).toThrow('Schema name cannot be used twice: profiles')
    })
  })

  test('#getUrl', () => {
    const schema = createSchema(data)
    expect(schema.getUrl()).toBe('/profiles')
  })

  test('#getModelUrl', () => {
    const schema = createSchema(data)

    expect(schema.getModelUrl(1)).toBe('/profiles/1')
    expect(schema.getModelUrl({ id: 1 })).toBe('/profiles/1')
  })

  describe('#resolve', () => {
    test('without generator', () => {
      const schema = createSchema(data)

      const model = schema.resolve({
        id: 1,
        firstName: 'Dimitri',
        lastName: 'Kurashvili',
        age: 39
      })

      expect(model).toEqual({
        id: 1,
        firstName: 'Dimitri',
        lastName: 'Kurashvili',
        __schema__: schema
      })
    })

    test('with generator', () => {
      const schema = createSchema({
        ...data,
        generator: createProfile
      })

      const model = schema.resolve({
        id: 1,
        firstName: 'Dimitri',
        lastName: 'Kurashvili',
        age: 39
      })

      expect(model).toEqual({
        id: 1,
        firstName: 'Dimitri',
        lastName: 'Kurashvili',
        fullName: 'Dimitri Kurashvili',
        __schema__: schema
      })
    })
  })
})
