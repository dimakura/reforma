import Reforma from '@reforma/core'
import defaultHint from '../defaultHint'

test('defaultHint', () => {
  expect(defaultHint(Reforma.integer)).toBe('number:0')
  expect(defaultHint(Reforma.float)).toBe('number:2')
  expect(defaultHint(Reforma.string)).toBe('string')
  expect(defaultHint(Reforma.bool)).toBe('bool')
  expect(defaultHint(Reforma.datetime)).toBe('date')
  expect(defaultHint(Reforma.arrayOf(Reforma.integer))).toBe('array:number:0')
  expect(defaultHint(Reforma.arrayOf(Reforma.string))).toBe('array:string')
  expect(defaultHint(Reforma.mapOf(Reforma.string, Reforma.integer))).toBe('string')
})
