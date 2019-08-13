import Reforma from '@reforma/core'
import { createField } from '../field'

describe('Field', () => {
  test('default field', () => {
    const field = createField(Reforma.integer)

    expect(field.__isField__).toBe(true)
    // TODO: should be
    // expect(field.getType()).toBe(Reforma.integer)
    expect(field.getType().name).toBe(Reforma.integer.name)
    expect(field.getName()).toBeNull()
    expect(field.getId()).toBe(false)
    expect(field.getCalc()).toBeNull()
    expect(field.getValidators()).toEqual([])
  })
})
