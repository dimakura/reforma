import Reforma from '@reforma/core'

describe('Primitive types', () => {
  ['integer', 'float', 'string', 'bool', 'datetime'].forEach((typeName) => {
    describe(typeName, () => {
      test('initial type', () => {
        const type = Reforma[typeName]
        isPrimitiveType(type, typeName)
        expect(type.__id__).toBeUndefined()
        expect(type.__calc__).toBeUndefined()
        expect(type.__validations__).toBeUndefined()
      })

      test('id type', () => {
        const type = Reforma[typeName].id

        expect(type.__id__).toBe(true)
      })

      test('calculated type', () => {
        const calcFn = jest.fn()
        const type = Reforma[typeName].calc(calcFn)

        expect(type.__calc__).toBe(calcFn)
      })

      test('calculated type: should pass a function', () => {
        expect(
          () => Reforma[typeName].calc('not-a-function')
        ).toThrow('Specify function in `calc`')
      })

      test('calculated type: double assignment', () => {
        expect(
          () => Reforma[typeName].calc(jest.fn()).calc(jest.fn())
        ).toThrow('Only single assignment permitted in `calc`')
      })

      test('validation', () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const type = Reforma[typeName].validate(fn1).validate(fn2)

        expect(type.__validators__).toEqual([fn1, fn2])
      })

      test('validation: should pass a function', () => {
        expect(
          () => Reforma[typeName].validate('not-a-function')
        ).toThrow('Specify function in `validate`')
      })
    })
  })
})

function isPrimitiveType(type, name) {
  expect(type.name).toBe(name)
  expect(type.__isType__).toBe(true)
  expect(type.__isBuiltInType__).toBe(true)
  expect(type.__isUserDefinedType__).toBe(false)
}
