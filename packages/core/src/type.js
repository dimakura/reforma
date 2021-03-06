import { createField } from './field'
import { instantiateType } from './instance'
import { serializeType } from './serialize'
import { setValidateMethods as setValidateMethodForUDT } from './validate'

const userDefinedTypeRegex = /^([A-Z][a-z0-9_]*\.?)+$/
let typeRegistry = {}

export const primitiveTypes = ['integer', 'float', 'string', 'bool', 'datetime']

export function createPrimitiveType(name) {
  if (primitiveTypes.indexOf(name) === -1) {
    throw new Error(`Not a primitive type: ${name}`)
  }

  if (name in typeRegistry) {
    return typeRegistry[name]
  }

  const type = {}

  // type definitions
  setTypeName(type, name)
  setTypeness(type, false, false, false)

  // field shortcuts
  setToField(type)
  setIdGetter(type)
  setCalcMethod(type)
  setValidateMethod(type)
  setBuiltInValidatorMethods(type)

  // create method
  setCreateMethod(type)

  // serialize method
  setSerializeMethod(type)

  return type
}

export function createArrayType(valueType) {
  if (valueType.__isType__ !== true) {
    throw new Error(`Array's value type is not a valid Reforma type: ${valueType}`)
  }

  const name = `[${valueType.name}]`

  if (name in typeRegistry) {
    return typeRegistry[name]
  }

  const type = {}

  // type definitions
  setTypeName(type, name)
  setTypeness(type, true, false, false)
  setValueType(type, valueType)

  // field shortcuts
  setToField(type)
  setCalcMethod(type)
  setValidateMethod(type)
  setBuiltInValidatorMethods(type)

  // create method
  setCreateMethod(type)

  // serialize method
  setSerializeMethod(type)

  return type
}

export function createMapType(keyType, valueType) {
  if (keyType.__isType__ !== true) {
    throw new Error(`Map's key type is not a valid Reforma type: ${keyType}`)
  }

  if (valueType.__isType__ !== true) {
    throw new Error(`Map's value type is not a valid Reforma type: ${valueType}`)
  }

  const name = `<${keyType.name},${valueType.name}>`

  if (name in typeRegistry) {
    return typeRegistry[name]
  }

  const type = {}

  // type definitions
  setTypeName(type, name)
  setTypeness(type, false, true, false)
  setKeyType(type, keyType)
  setValueType(type, valueType)

  // field shortcuts
  setToField(type)
  setCalcMethod(type)
  setValidateMethod(type)
  setBuiltInValidatorMethods(type)

  // create method
  setCreateMethod(type)

  // serialize method
  setSerializeMethod(type)

  return type
}

// Create user defined type.
export function createType(opts = {}) {
  const name = opts.name
  const fields = opts.fields
  const isValidName = typeof name === 'string' && userDefinedTypeRegex.test(name)
  const typeAlreadyDefined = name in typeRegistry
  const areValidFields = fields == null || typeof fields === 'object'

  if (!isValidName) {
    throw new Error(`Invalid name for a user defined type: ${name}`)
  }

  if (typeAlreadyDefined) {
    throw new Error(`Type was already defined: ${name}`)
  }

  if (!areValidFields) {
    throw new Error(`Invalid fields definition: ${fields}`)
  }

  const type = {}
  const privateData = {
    validators: []
  }

  // User defined type is different from built-in type in few aspects:
  // 1. We don't have `id`, or `calc` methods defined on it
  // 2. We have `validate(fn)` method, which applies to the type itself.
  // In case of a built-in type, no changes happen with type, but
  // with a field.

  // type definitions
  setTypeName(type, name)
  setTypeness(type, false, false, true)
  setDefineFieldsMethod(type)
  setValidateMethodForUDT(type, privateData)

  // field shortcuts
  setToField(type)

  // create method
  setCreateMethod(type)

  // serialize method
  setSerializeMethod(type)

  // define fields
  if (fields != null) {
    type.defineFields(fields)
  }

  return type
}

export function __cleanupTypes__() {
  typeRegistry = {}
}

// -- PRIVATE

function setTypeName(type, name) {
  typeRegistry[name] = type

  Object.defineProperty(type, 'name', { value: name })
  Object.defineProperty(type, 'toString', {
    value: function () {
      return name
    }
  })
}

function setTypeness(type, isArray = false, isMap = false, isUserDefined = false) {
  const isPrimitive = !isArray && !isMap && !isUserDefined

  Object.defineProperty(type, '__isType__', { value: true })
  Object.defineProperty(type, '__isPrimitiveType__', { value: isPrimitive })
  Object.defineProperty(type, '__isArray__', { value: isArray })
  Object.defineProperty(type, '__isMap__', { value: isMap })
  Object.defineProperty(type, '__isUserDefinedType__', { value: isUserDefined })
}

function setValueType(type, baseType) {
  Object.defineProperty(type, 'valueType', { value: baseType })
}

function setKeyType(type, keyType) {
  Object.defineProperty(type, 'keyType', { value: keyType })
}

function setDefineFieldsMethod(type) {
  const idFields = []
  let fields = null

  function getFields() {
    return fields
  }

  function getIdFields() {
    return idFields
  }

  function defineFields(newFields) {
    if (fields != null) {
      throw new Error('You cannot redefine fields')
    }

    const names = Object.getOwnPropertyNames(newFields)
    if (names.length === 0) {
      throw new Error('Please provide at least one field')
    }

    const extractedFields = {}
    const idFieldsArray = []
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const data = newFields[name]

      const field = do {
        if (data.__isType__) {
          const field = createField(data)
          field.setName(name)
          field
        } else if (data.__isField__) {
          data.setName(name)
          data
        } else {
          throw new Error(`Wrong field descriptor for ${name}: ${data}`)
        }
      }

      Object.defineProperty(extractedFields, name, {
        value: field,
        enumerable: true
      })

      if (field.getId()) {
        idFieldsArray.push(field)
      }
    }

    fields = extractedFields
    for (let i = 0; i < idFieldsArray.length; i++) {
      Object.defineProperty(idFields, i, { value: idFieldsArray[i] })
    }
  }

  Object.defineProperty(type, 'defineFields', { value: defineFields })
  Object.defineProperty(type, 'getFields', { value: getFields })
  Object.defineProperty(type, 'getIdFields', { value: getIdFields })
}

function setIdGetter(type) {
  function getter() {
    return createField(type).id
  }

  Object.defineProperty(type, 'id', { get: getter })
}

function setCalcMethod(type) {
  function calcMethod(calcFn) {
    return type.toField.calc(calcFn)
  }

  Object.defineProperty(type, 'calc', { value: calcMethod })
}

function setValidateMethod(type) {
  function validateMethod(validateFn) {
    return type.toField.validate(validateFn)
  }

  Object.defineProperty(type, 'validate', { value: validateMethod })
}

function setBuiltInValidatorMethods(type) {
  function defineValidator(name) {
    Object.defineProperty(type, name, {
      value: function () {
        return type.toField[name].apply(null, arguments)
      }
    })
  }

  if (type.name === 'integer' || type.name === 'float') {
    defineValidator('greaterThan')
    defineValidator('greaterOrEqualTo')
    defineValidator('lessThan')
    defineValidator('lessOrEqualTo')
  }

  defineValidator('presence')
  defineValidator('inclusion')
}

function setCreateMethod(type) {
  Object.defineProperty(type, 'create', {
    value: function (value) {
      return instantiateType(type, value)
    }
  })
}

function setToField(type) {
  Object.defineProperty(type, 'toField', {
    get: function () {
      return createField(type)
    }
  })
}

function setSerializeMethod(type) {
  Object.defineProperty(type, 'serialize', {
    value: function (value, fields) {
      return serializeType(type, value, fields)
    }
  })
}
