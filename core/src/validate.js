import { instantiateType } from './instance'

const typeMismatch = Object.defineProperty({}, 'isTypeMismatch', { value: true })

export function setValidateMethods(fieldOrType, privateData) {
  function getValidators() {
    return privateData.validators
  }

  function valiate(validateFn) {
    if (typeof validateFn !== 'function') {
      throw new Error('Specify function in `validate`')
    }

    privateData.validators.push(validateFn)

    return fieldOrType
  }

  Object.defineProperty(fieldOrType, 'getValidators', { value: getValidators })
  Object.defineProperty(fieldOrType, 'validate', { value: valiate })
}

export function validateField(field, value) {
  return do {
    if (!isValueOfType(field.getType(), value)) {
      typeMismatch
    } else {
      const errors = []
      const validators = field.getValidators()

      for (let i = 0; i < validators.length; i++) {
        const validatorFn = validators[i]
        const fieldErrors = validatorFn(value, field)
        if (Array.isArray(fieldErrors)) {
          errors.push(...fieldErrors)
        } else if (fieldErrors != null) {
          errors.push(fieldErrors)
        }
      }

      if (errors.length === 0) {
        null
      } else {
        errors
      }
    }
  }
}

export function validateUserDefinedType(type, value) {
  // TODO: before continuing here, fix FIXME in type.js

  return null
}

// -- PRIVATE

function isValueOfType(type, value) {
  return do {
    if (value == null) {
      true
    } else {
      instantiateType(type, value) !== null
    }
  }
}
