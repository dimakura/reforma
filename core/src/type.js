import { createField } from './field'

export const primitiveTypes = ['integer', 'float', 'string', 'bool', 'datetime']
export const buildInTypes = primitiveTypes.concat(['array', 'map'])

const typeRegistry = {}

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

  return type
}

export function createType(opts = {}) {
  const name = opts.name
  // const fields = opts.fields

  // TODO:
  // 1. name should match pattern Namespace.Name
  // 2. assign fields

  const type = {}
  setTypeName(type, name)
  setTypeness(type, false, false, true)
  setCalcMethod(type)
  setValidateMethod(type)
  // 3. add defineFields method
  // setDefineFieldsMethod(type)

  return type
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
