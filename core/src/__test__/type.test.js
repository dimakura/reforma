import Reforma from '@reforma/core'

describe('Built-in types', () => {
  ['integer', 'float', 'string', 'bool', 'datetime'].forEach((typeName) => {
    test(typeName, () => {
      const type = Reforma[typeName]

      isBuiltInType(type, typeName)
      hasIdGetter(type)
      isCalculable(type)
      isValidable(type)
    })
  })

  test('arrayOf', () => {
    const type = Reforma.arrayOf(Reforma.integer)

    isBuiltInType(type, 'array')
    hasNoIdGetter(type)
    hasValueType(type, Reforma.integer)
    isCalculable(type)
    isValidable(type)

    expect(
      () => Reforma.arrayOf('something')
    ).toThrow('Array\'s value type is not a valid Reforma type: something')
  })

  test('mapOf', () => {
    const type = Reforma.mapOf(Reforma.string, Reforma.integer)

    isBuiltInType(type, 'map')
    hasNoIdGetter(type)
    hasKeyType(type, Reforma.string)
    hasValueType(type, Reforma.integer)
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

function isBuiltInType(type, name) {
  expect(type.name).toBe(name)
  expect(type.__isType__).toBe(true)
  expect(type.__isBuiltInType__).toBe(true)
  expect(type.__isUserDefinedType__).toBe(false)
}

function hasIdGetter(type) {
  expect(type.__id__).toBeUndefined()
  expect(type.id).toBe(type)
  expect(type.__id__).toBe(true)
}

function hasNoIdGetter(type) {
  expect(type.__id__).toBeUndefined()
  expect(type.id).toBeUndefined()
  expect(type.__id__).toBeUndefined()
}

function isCalculable(type) {
  const calcFn = jest.fn()
  expect(type.__calc__).toBeUndefined()
  expect(type.calc(calcFn)).toBe(type)
  expect(type.__calc__).toBe(calcFn)
  expect(
    () => type.calc('not-a-function')
  ).toThrow('Specify function in `calc`')
  expect(
    () => type.calc(jest.fn())
  ).toThrow('Only single assignment permitted in `calc`')
}

function isValidable(type) {
  const fn1 = jest.fn()
  const fn2 = jest.fn()

  expect(type.__validations__).toBeUndefined()
  expect(type.validate(fn1).validate(fn2)).toBe(type)
  expect(type.__validators__).toEqual([fn1, fn2])
  expect(
    () => type.validate('not-a-function')
  ).toThrow('Specify function in `validate`')
}

function hasKeyType(type, keyType) {
  expect(type.keyType.name).toBe(keyType.name)
}

function hasValueType(type, valueType) {
  expect(type.valueType.name).toBe(valueType.name)
}
