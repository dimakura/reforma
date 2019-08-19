import Reforma from '@reforma/core'
import { createField } from '../field'
import { validateField, validateUserDefinedType } from '../validate'

describe('validateField', () => {
  test('no validations', () => {
    const field = createField(Reforma.integer)

    expect(validateField(field, 0)).toBeNull()
    expect(validateField(field, 'x').isTypeMismatch).toBe(true)
  })

  test('custom validator', () => {
    const field = Reforma.integer.validate((value) => {
      return do {
        if (value < 0) {
          'Please provide positive number'
        }
      }
    })

    expect(validateField(field, 0)).toBeNull()
    expect(validateField(field, 1)).toBeNull()
    expect(validateField(field, -1)).toEqual(['Please provide positive number'])
  })
})
