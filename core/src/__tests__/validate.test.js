import Reforma from '@reforma/core'
import { createField } from '../field'
import { validateField, validateUserDefinedType } from '../validate'

describe('validateField', () => {
  test('no validations', () => {
    const field = createField(Reforma.integer)

    expect(validateField(field, 0)).toBeNull()
    expect(validateField(field, 'x').isTypeMismatch).toBe(true)
  })

  describe('built-in validators', () => {
    test('presence', () => {
      const field = Reforma.string.presence({ message: 'this field is required!' })

      expect(validateField(field, 'text')).toBeNull()
      expect(validateField(field, null)).toEqual(['this field is required!'])
      expect(validateField(field, '')).toEqual(['this field is required!'])
    })

    test('numeric validators', () => {
      const field = Reforma.integer.greaterThan(0)

      expect(validateField(field, -1)).toEqual(['should be greater than 0'])
      expect(validateField(field, 0)).toEqual(['should be greater than 0'])
      expect(validateField(field, 1)).toBeNull()
    })
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

describe('validate user definde type', () => {
  const orderType = Reforma.createType({
    name: 'Order',
    fields: {
      id: Reforma.integer.id,
      price: Reforma.float.validate((value) => {
        return do {
          if (value < 0) {
            'Please provide positive price'
          }
        }
      }),
      quantity: Reforma.integer.validate((value) => {
        return do {
          if (value < 0) {
            'Please provide positive quantity'
          }
        }
      })
    }
  }).validate((model) => {
    if (model != null) {
      const total = model.price * model.quantity

      if (total < 0) {
        return 'Total should be greater than 0'
      }
    }
  })

  const instance = orderType.create({
    id: 1,
    price: 10,
    quantity: 1
  })

  const instance2 = orderType.create({
    id: 2,
    price: -10,
    quantity: 1
  })

  const instance3 = orderType.create({
    id: 3,
    price: -10,
    quantity: -1
  })

  expect(validateUserDefinedType(orderType, null)).toBeNull()
  expect(validateUserDefinedType(orderType, 0).isTypeMismatch).toBe(true)
  expect(validateUserDefinedType(orderType, instance)).toBeNull()
  expect(validateUserDefinedType(orderType, instance2)).toEqual({
    __base__: ['Total should be greater than 0'],
    price: ['Please provide positive price']
  })
  expect(validateUserDefinedType(orderType, instance3)).toEqual({
    price: ['Please provide positive price'],
    quantity: ['Please provide positive quantity']
  })
})
