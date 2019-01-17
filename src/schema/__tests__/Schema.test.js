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
    name: 'Profile',
    fields: ['firstName', 'lastName']
  }

  test('createSchema', () => {
    const schema = createSchema(data)

    expect(schema.name).toBe('Profile')
    expect(schema.fields).toHaveLength(2)
    expect(schema.fields[0].name).toBe('firstName')
    expect(schema.fields[1].name).toBe('lastName')
    expect(schema.modelGenerator).toBeUndefined()
    expect(schema.baseUrl).toBe('profile')
  })

  describe('#getUrl', () => {
    test('without baseUrl', () => {
      const schema = createSchema(data)

      expect(schema.getUrl()).toBe('profile')
    })

    test('with baseUrl', () => {
      const schema = createSchema({
        ...data,
        baseUrl: '/profiles'
      })

      expect(schema.getUrl()).toBe('/profiles')
    })
  })

  test('#getModelUrl', () => {
    const schema = createSchema(data)

    expect(schema.getModelUrl(1)).toBe('profile/1')
    expect(schema.getModelUrl({ id: 1 })).toBe('profile/1')
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
