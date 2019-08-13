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
  defineTypeName(type, name)
  defineTypeness(type, false, false, false)
  defineIdGetter(type)
  defineCalcMethod(type)
  defineValidateMethod(type)

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
  defineTypeName(type, name)
  defineValueType(type, valueType)
  defineTypeness(type, true, false, false)
  defineCalcMethod(type)
  defineValidateMethod(type)

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
  defineTypeName(type, name)
  defineKeyType(type, keyType)
  defineValueType(type, valueType)
  defineTypeness(type, false, true, false)
  defineCalcMethod(type)
  defineValidateMethod(type)

  return type
}

export function createType(opts) {
  const type = {}

  // TODO: user defined type creation

  return type
}

// -- PRIVATE

function defineTypeName(type, name) {
  Object.defineProperty(type, 'name', { value: name })
  typeRegistry[name] = type
}

function defineTypeness(type, isArray = false, isMap = false, isUserDefined = false) {
  const isPrimitive = !isArray && !isMap && !isUserDefined

  Object.defineProperty(type, '__isType__', { value: true })
  Object.defineProperty(type, '__isPrimitivType__', { value: isPrimitive })
  Object.defineProperty(type, '__isArray__', { value: isArray })
  Object.defineProperty(type, '__isMap__', { value: isMap })
  Object.defineProperty(type, '__isUserDefinedType__', { value: isUserDefined })
}

function defineValueType(type, baseType) {
  Object.defineProperty(type, 'valueType', { value: baseType })
}

function defineKeyType(type, keyType) {
  Object.defineProperty(type, 'keyType', { value: keyType })
}

function defineIdGetter(type) {
  function getter() {
    return createField(type).id
  }

  Object.defineProperty(type, 'id', { get: getter })
}

function defineCalcMethod(type) {
  function calcMethod(calcFn) {
    return createField(type).calc(calcFn)
  }

  Object.defineProperty(type, 'calc', { value: calcMethod })
}

function defineValidateMethod(type) {
  function validateMethod(validateFn) {
    return createField(type).validate(validateFn)
  }

  Object.defineProperty(type, 'validate', { value: validateMethod })
}
