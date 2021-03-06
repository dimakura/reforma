import Reforma from '@reforma/core'

describe('Built-in types', () => {
  ['integer', 'float', 'string', 'bool', 'datetime'].forEach((typeName) => {
    test(typeName, () => {
      const type = Reforma[typeName]

      expect(type).toBe(Reforma[typeName])
      isPrimitiveType(type, typeName)
      hasToFieldConverter(type)
      hasIdGetter(type)
      isCalculable(type)
      isValidable(type)
    })
  })

  test('arrayOf', () => {
    const type = Reforma.arrayOf(Reforma.integer)

    expect(type).toBe(Reforma.arrayOf(Reforma.integer))
    expect(type).not.toBe(Reforma.arrayOf(Reforma.string))
    isArrayType(type)
    hasToFieldConverter(type)
    hasNoIdGetter(type)
    isCalculable(type)
    isValidable(type)

    expect(
      () => Reforma.arrayOf('something')
    ).toThrow('Array\'s value type is not a valid Reforma type: something')
  })

  test('mapOf', () => {
    const type = Reforma.mapOf(Reforma.string, Reforma.integer)

    expect(type).toBe(Reforma.mapOf(Reforma.string, Reforma.integer))
    expect(type).not.toBe(Reforma.mapOf(Reforma.string, Reforma.string))
    isMapType(type, 'map')
    hasToFieldConverter(type)
    hasNoIdGetter(type)
    isCalculable(type)
    isValidable(type)

    expect(
      () => Reforma.mapOf('something', Reforma.integer)
    ).toThrow('Map\'s key type is not a valid Reforma type: something')
    expect(
      () => Reforma.mapOf(Reforma.string, 'anything')
    ).toThrow('Map\'s value type is not a valid Reforma type: anything')
  })

  test('instantiation', () => {
    expect(Reforma.integer.create('1.5')).toBe(1)
    expect(Reforma.float.create('1.5')).toBe(1.5)
    expect(Reforma.string.create([1, 2, 3])).toBe('1,2,3')
    expect(Reforma.bool.create(1)).toBe(true)
    expect(Reforma.datetime.create('2019-08-12 20:00:00')).toBeInstanceOf(Date)
    expect(Reforma.arrayOf(Reforma.integer).create(['1', '2', '3'])).toEqual([1, 2, 3])
    expect(Reforma.mapOf(Reforma.string, Reforma.integer).create({ a: '1', b: '2', c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
  })

  test('serialization', () => {
    expect(Reforma.integer.serialize(1)).toBe(1)
    expect(Reforma.createType({
      name: 'Profile',
      fields: {
        id: Reforma.integer.id,
        firstName: Reforma.string,
        lastName: Reforma.string
      }
    }).serialize({
      id: 1,
      firstName: 'Leo',
      lastName: 'Tolstoy'
    })).toEqual({
      id: 1,
      first_name: 'Leo',
      last_name: 'Tolstoy'
    })
  })
})

describe('User defined types', () => {
  test('normal scenario', () => {
    const calc = jest.fn()
    const profileType = Reforma.createType({
      name: 'Profile',
      fields: {
        id: Reforma.integer.id,
        email: Reforma.string,
        firstName: Reforma.string,
        lastName: Reforma.string,
        fullName: Reforma.string.calc(calc)
      }
    })

    isUserDefinedType(profileType, 'Profile')
    hasToFieldConverter(profileType)
    hasNoIdGetter(profileType)
    isNotCalculable(profileType)
    isValidable(profileType)
    hasFieldOfNameAndType(profileType, 'id', Reforma.integer)
    hasFieldOfNameAndType(profileType, 'email', Reforma.string)
    hasFieldOfNameAndType(profileType, 'firstName', Reforma.string)
    hasFieldOfNameAndType(profileType, 'lastName', Reforma.string)
    hasFieldOfNameAndType(profileType, 'fullName', Reforma.string)

    const fields = profileType.getFields()
    const idFields = profileType.getIdFields()
    expect(fields.id.getId()).toBe(true)
    expect(fields.fullName.getCalc()).toBe(calc)
    expect(idFields).toHaveLength(1)
    expect(idFields[0].getName()).toBe('id')
  })

  test('define fields separately', () => {
    const profileType = Reforma.createType({
      name: 'Profile'
    })

    isUserDefinedType(profileType, 'Profile')
    hasToFieldConverter(profileType)
    hasNoIdGetter(profileType)
    isNotCalculable(profileType)
    isValidable(profileType)
    expect(profileType.getFields()).toBeNull()

    profileType.defineFields({
      id: Reforma.integer.id,
      email: Reforma.string
    })

    hasFieldOfNameAndType(profileType, 'id', Reforma.integer)
    hasFieldOfNameAndType(profileType, 'email', Reforma.string)

    expect(() => {
      profileType.defineFields({
        firstName: Reforma.string,
        lastName: Reforma.string
      })
    }).toThrow('You cannot redefine field')
  })

  describe('faulty scenarios', () => {
    test('wrong names', () => {
      ['lowerFirst', '1a', 'test?', 'wrong!', 'also-wrong'].forEach(wrongName => {
        expect(() => {
          Reforma.createType({ name: wrongName })
        }).toThrow(`Invalid name for a user defined type: ${wrongName}`)
      })
    })

    test('repeated declaration', () => {
      Reforma.createType({ name: 'UserDefinedType' })

      expect(() => {
        Reforma.createType({ name: 'UserDefinedType' })
      }).toThrow('Type was already defined: UserDefinedType')
    })

    test('invalid field definitions', () => {
      [1, 'fields'].forEach(invalidFields => {
        expect(() => {
          Reforma.createType({
            name: 'UserDefinedType',
            fields: invalidFields
          })
        }).toThrow(`Invalid fields definition: ${invalidFields}`)
      })
    })

    test('invalid field descriptor', () => {
      expect(() => {
        Reforma.createType({
          name: 'UserDefinedType',
          fields: {
            id: 'id-field'
          }
        })
      }).toThrow('Wrong field descriptor for id: id-field')
    })
  })

  test('instantiation', () => {
    const profileType = Reforma.createType({
      name: 'Profile',
      fields: {
        id: Reforma.integer.id,
        firstName: Reforma.string,
        lastName: Reforma.string
      }
    })

    const instance = profileType.create({
      id: '1',
      first_name: 'Henry',
      last_name: 'Ford'
    })

    expect(instance.__type__).toBe(profileType)
    expect(instance.id).toBe(1)
    expect(instance.firstName).toBe('Henry')
    expect(instance.lastName).toBe('Ford')
  })
})

function isPrimitiveType(type, name) {
  expect(type.name).toBe(name)
  expect(type.__isType__).toBe(true)
  expect(type.__isPrimitiveType__).toBe(true)
  expect(type.__isArray__).toBe(false)
  expect(type.__isMap__).toBe(false)
  expect(type.__isUserDefinedType__).toBe(false)
}

function isArrayType(type) {
  expect(type.name).toBe(`[${type.valueType.name}]`)
  expect(type.__isType__).toBe(true)
  expect(type.__isPrimitiveType__).toBe(false)
  expect(type.__isArray__).toBe(true)
  expect(type.__isMap__).toBe(false)
  expect(type.__isUserDefinedType__).toBe(false)
}

function isMapType(type) {
  expect(type.name).toBe(`<${type.keyType.name},${type.valueType.name}>`)
  expect(type.__isType__).toBe(true)
  expect(type.__isPrimitiveType__).toBe(false)
  expect(type.__isArray__).toBe(false)
  expect(type.__isMap__).toBe(true)
  expect(type.__isUserDefinedType__).toBe(false)
}

function isUserDefinedType(type, name) {
  expect(type.name).toBe(name)
  expect(type.__isType__).toBe(true)
  expect(type.__isPrimitiveType__).toBe(false)
  expect(type.__isArray__).toBe(false)
  expect(type.__isMap__).toBe(false)
  expect(type.__isUserDefinedType__).toBe(true)
}

function hasToFieldConverter(type) {
  const field = type.toField
  expect(field.__isField__).toBe(true)
  expect(field.getType()).toBe(type)
}

function hasIdGetter(type) {
  const field = type.id
  expect(field.__isField__).toBe(true)
  expect(field.getId()).toBe(true)
}

function hasNoIdGetter(type) {
  expect('id' in type).toBe(false)
  expect('setId' in type).toBe(false)
}

function isCalculable(type) {
  const calcFn = jest.fn()
  const field = type.calc(calcFn)
  expect(field.__isField__).toBe(true)
  expect(field.getCalc()).toBe(calcFn)

  expect(
    () => type.calc('not-a-function')
  ).toThrow('Specify function in `calc`')
  expect(
    () => field.calc(jest.fn())
  ).toThrow('Only single assignment permitted in `calc`')
}

function isNotCalculable(type) {
  expect('calc' in type).toBe(false)
}

function isValidable(type) {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const field = type.validate(fn1).validate(fn2)

  expect(field.__isField__ || field.__isUserDefinedType__).toBe(true)
  expect(field.getValidators()).toEqual([fn1, fn2])

  expect(
    () => type.validate('not-a-function')
  ).toThrow('Specify function in `validate`')
}

function hasFieldOfNameAndType(type, fieldName, fieldType) {
  const field = type.getFields()[fieldName]

  expect(field.__isField__).toBe(true)
  expect(field.getName()).toBe(fieldName)
  expect(field.getType()).toBe(fieldType)
}
