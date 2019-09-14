import Reforma from '@reforma/core'
import { createField } from '../field'

describe('Field', () => {
  test('primitive type field', () => {
    const field = createField(Reforma.integer)

    isField(field)
    hasType(field, Reforma.integer)
    canName(field)
    canSetId(field)
    canCalc(field)
    canValidate(field)
  })

  test('non-primitive type field', () => {
    const field = createField(Reforma.arrayOf(Reforma.string))

    isField(field)
    hasType(field, Reforma.arrayOf(Reforma.string))
    canName(field)
    cannotSetId(field)
    canCalc(field)
    canValidate(field)
  })

  function isField(field) {
    expect(field.__isField__).toBe(true)
  }

  function hasType(field, type) {
    expect(field.getType()).toBe(type)
  }

  function canName(field) {
    expect(field.getName()).toBeNull()

    // invalid name assignment
    expect(() => field.setName('isThisName?')).toThrow('Illegal field name: isThisName?')

    // valid name assignment
    expect(() => field.setName('validName')).not.toThrow()
    expect(field.getName()).toBe('validName')

    // second valid name assignment
    expect(() => field.setName('anotherValidName')).toThrow('Field name is already defined')
    expect(field.getName()).toBe('validName')
  }

  function canSetId(field) {
    expect(field.getId()).toBe(false)

    // `.id` getter can be chained
    expect(field.id).toBe(field)
    expect(field.getId()).toBe(true)

    // `.setId` cannot be chained
    expect(field.setId(false)).toBeUndefined()
    expect(field.getId()).toBe(false)
  }

  function cannotSetId(field) {
    expect(field.getId()).toBe(false)
    expect('id' in field).toBe(false)
    expect('setId' in field).toBe(false)
  }

  function canCalc(field) {
    expect(() => field.calc('something')).toThrow('Specify function in `calc`')
    expect(field.getCalc()).toBeNull()
    expect(field.isCalculable).toBe(false)

    const fn = jest.fn()

    // `.calc` can be chained
    expect(field.calc(fn)).toBe(field)
    expect(field.getCalc()).toBe(fn)
    expect(field.isCalculable).toBe(true)

    // subsequent `.calc` calls are banned
    expect(() => field.calc(jest.fn())).toThrow('Only single assignment permitted in `calc`')
    expect(field.getCalc()).toBe(fn)
  }

  function canValidate(field) {
    expect(field.getValidators()).toEqual([])

    // validators can be chained
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    expect(field.validate(fn1).validate(fn2)).toBe(field)
    expect(field.getValidators()).toEqual([fn1, fn2])

    // only function is allowed
    expect(() => field.validate('non-function')).toThrow('Specify function in `validate`')
  }
})
