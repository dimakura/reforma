import { instantiateType } from './instance'

const typeMismatch = Object.defineProperty({}, 'isTypeMismatch', { value: true })

// Defines `getValidators` and `valiate` methods for fields and user defined types.
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
  return do {
    if (value == null) {
      null
    } else if (!isValueOfType(type, value)) {
      typeMismatch
    } else {
      const errors = {}
      const hasBaseErrors = collectBaseErrors(type, value, errors)
      const hasFieldErrors = collectFieldErrors(type, value, errors)

      if (hasBaseErrors || hasFieldErrors) {
        errors
      } else {
        null
      }
    }
  }
}

// -- PRIVATE

function isValueOfType(type, value) {
  return do {
    if (value == null) {
      true
    } else if (type.__isUserDefinedType__) {
      value.__type__ === type
    } else {
      instantiateType(type, value) !== null
    }
  }
}

function collectBaseErrors(type, value, errors) {
  const baseErrors = []
  const validators = type.getValidators()

  for (let i = 0; i < validators.length; i++) {
    const validatorFn = validators[i]
    const typeErrors = validatorFn(value, type)
    if (Array.isArray(typeErrors)) {
      baseErrors.push(...typeErrors)
    } else if (typeErrors != null) {
      baseErrors.push(typeErrors)
    }
  }

  return do {
    if (baseErrors.length > 0) {
      errors.__base__ = baseErrors
      true
    } else {
      false
    }
  }
}

function collectFieldErrors(type, value, errors) {
  let hasErrors = false
  const fields = type.getFields()
  const fieldNames = Object.getOwnPropertyNames(fields)

  for (let i = 0; i < fieldNames.length; i++) {
    const name = fieldNames[i]
    const field = fields[name]
    const fieldErrors = validateField(field, value[name])

    if (fieldErrors != null) {
      errors[name] = fieldErrors
      hasErrors = true
    }
  }

  return hasErrors
}
