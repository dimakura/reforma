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

function hasIdGetter(type) {
  const field = type.id
  expect(field.__isField__).toBe(true)
  expect(field.getId()).toBe(true)
}

function hasNoIdGetter(type) {
  expect(type.id).toBeUndefined()
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
