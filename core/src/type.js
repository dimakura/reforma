import { createField } from './field'
import { instantiateType } from './instance'

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
  setTypeName(type, name)
  setTypeness(type, false, false, false)
  setIdGetter(type)
  setCalcMethod(type)
  setValidateMethod(type)
  setCreateMethod(type)

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
  setTypeName(type, name)
  setTypeness(type, true, false, false)
  setValueType(type, valueType)
  setCalcMethod(type)
  setValidateMethod(type)
  setCreateMethod(type)

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
  setTypeName(type, name)
  setTypeness(type, false, true, false)
  setKeyType(type, keyType)
  setValueType(type, valueType)
  setCalcMethod(type)
  setValidateMethod(type)
  setCreateMethod(type)

  return type
}

export function createType(opts = {}) {
  const name = opts.name
  const fields = opts.fields
  // TODO: const serialMap = opts.serialMap
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

  setTypeName(type, name)
  setTypeness(type, false, false, true)
  setDefineFieldsMethod(type)
  setCreateMethod(type)

  // FIXME:
  // 1. in case of a user defined type we should not use plain calc/validate methods
  // 2. we first need to convert type into field explicitly (using `toField` method)
  // 3. we need to support type level validations for user defined types
  setCalcMethod(type)
  setValidateMethod(type)

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
  Object.defineProperty(type, 'name', { value: name })
  typeRegistry[name] = type
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
  let fields = null

  function getFields() {
    return fields
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
    }

    fields = extractedFields
  }

  Object.defineProperty(type, 'defineFields', { value: defineFields })
  Object.defineProperty(type, 'getFields', { value: getFields })
}

function setIdGetter(type) {
  function getter() {
    return createField(type).id
  }

  Object.defineProperty(type, 'id', { get: getter })
}

function setCalcMethod(type) {
  function calcMethod(calcFn) {
    return createField(type).calc(calcFn)
  }

  Object.defineProperty(type, 'calc', { value: calcMethod })
}

function setValidateMethod(type) {
  function validateMethod(validateFn) {
    return createField(type).validate(validateFn)
  }

  Object.defineProperty(type, 'validate', { value: validateMethod })
}

function setCreateMethod(type) {
  Object.defineProperty(type, 'create', {
    value: function (value) {
      return instantiateType(type, value)
    }
  })
}
