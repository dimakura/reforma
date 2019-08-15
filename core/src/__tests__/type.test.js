import Reforma from '@reforma/core'

describe('Built-in types', () => {
  ['integer', 'float', 'string', 'bool', 'datetime'].forEach((typeName) => {
    test(typeName, () => {
      const type = Reforma[typeName]

      expect(type).toBe(Reforma[typeName])
      isPrimitiveType(type, typeName)
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
    hasNoIdGetter(profileType)
    isCalculable(profileType)
    isValidable(profileType)
    hasFieldOfNameAndType(profileType, 'id', Reforma.integer)
    hasFieldOfNameAndType(profileType, 'email', Reforma.string)
    hasFieldOfNameAndType(profileType, 'firstName', Reforma.string)
    hasFieldOfNameAndType(profileType, 'lastName', Reforma.string)
    hasFieldOfNameAndType(profileType, 'fullName', Reforma.string)

    const fields = profileType.getFields()
    expect(fields.id.getId()).toBe(true)
    expect(fields.fullName.getCalc()).toBe(calc)
  })

  test('define fields separately', () => {
    const profileType = Reforma.createType({
      name: 'Profile'
    })

    isUserDefinedType(profileType, 'Profile')
    hasNoIdGetter(profileType)
    isCalculable(profileType)
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

function isValidable(type) {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const field = type.validate(fn1).validate(fn2)

  expect(field.__isField__).toBe(true)
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
