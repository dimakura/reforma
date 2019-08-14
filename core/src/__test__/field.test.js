import Reforma from '@reforma/core'
import { createField } from '../field'

describe('Field', () => {
  test('default field', () => {
    const field = createField(Reforma.integer)

    expect(field.__isField__).toBe(true)
    expect(field.getType()).toBe(Reforma.integer)
    expect(field.getName()).toBeNull()
    expect(field.getId()).toBe(false)
    expect(field.getCalc()).toBeNull()
    expect(field.getValidators()).toEqual([])
  })

  // TODO: field tests!
})
