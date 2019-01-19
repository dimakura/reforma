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
    baseUrl: '/profiles',
    fields: ['id', 'firstName', 'lastName']
  }

  describe('createSchema', () => {
    test('default case', () => {
      const schema = createSchema(data)

      expect(schema.fields).toHaveLength(3)
      expect(schema.fields[0].name).toBe('id')
      expect(schema.fields[1].name).toBe('firstName')
      expect(schema.fields[2].name).toBe('lastName')
      expect(schema.modelGenerator).toBeUndefined()
      expect(schema.baseUrl).toBe('/profiles')
      expect(schema.isSingleton).toBe(false)
    })

    test('singleton schema', () => {
      const schema = createSchema({
        ...data,
        singleton: true
      })

      expect(schema.isSingleton).toBe(true)
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
