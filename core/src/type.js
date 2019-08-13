export const primitiveTypes = ['integer', 'float', 'string', 'bool', 'datetime']
export const buildInTypes = primitiveTypes.concat(['array', 'map'])

export function createPrimitiveType(name) {
  const type = {}
  defineTypeName(type, name)
  defineBuiltInType(type)
  defineIdAssignment(type)
  defineCalcAssignment(type)
  defineValidateAssinment(type)

  return type
}

export function createArrayType(valueType) {
  if (valueType.__isType__ !== true) {
    throw new Error(`Array's value type is not a valid Reforma type: ${valueType}`)
  }

  const type = {}
  defineTypeName(type, 'array')
  defineBuiltInType(type)
  defineCalcAssignment(type)
  defineValidateAssinment(type)
  defineValueType(type, valueType)

  return type
}

export function createMapType(keyType, valueType) {
  if (keyType.__isType__ !== true) {
    throw new Error(`Map's key type is not a valid Reforma type: ${keyType}`)
  }

  if (valueType.__isType__ !== true) {
    throw new Error(`Map's value type is not a valid Reforma type: ${valueType}`)
  }

  const type = {}
  defineTypeName(type, 'map')
  defineBuiltInType(type)
  defineCalcAssignment(type)
  defineValidateAssinment(type)
  defineKeyType(type, keyType)
  defineValueType(type, valueType)

  return type
}

export function createType(opts) {
  // CREATE TYPE should create ""

  const type = {}
  // TODO:
  // validateName(opts.name)
  // defineName(type, name)
  // defineUserDefinedType(type)
  // defineFields()

  // ==> calc & validate will break mutability
  // defineCalcAssignment(type)
  // defineValidateAssinment(type)

  return type
}

// -- PRIVATE

function defineTypeName(type, name) {
  if (buildInTypes.indexOf(name) === -1) {
    throw new Error(`Not a built-in type: ${name}`)
  }

  Object.defineProperty(type, 'name', { value: name })
}

function defineBuiltInType(type) {
  Object.defineProperty(type, '__isType__', { value: true })
  Object.defineProperty(type, '__isBuiltInType__', { value: true })
  Object.defineProperty(type, '__isUserDefinedType__', { value: false })
}

function defineValueType(type, baseType) {
  Object.defineProperty(type, 'valueType', { value: baseType })
}

function defineKeyType(type, keyType) {
  Object.defineProperty(type, 'keyType', { value: keyType })
}

function defineIdAssignment(type) {
  function assignmentFn(value) {
    Object.defineProperty(this, '__id__', { value })
    return this
  }

  Object.defineProperty(type, 'id', {
    get: assignmentFn.bind(type, true)
  })
}

function defineCalcAssignment(type) {
  function assignmentFn(calcFn) {
    if (typeof calcFn !== 'function') {
      throw new Error('Specify function in `calc`')
    }

    if (this.__calc__ != null) {
      throw new Error('Only single assignment permitted in `calc`')
    }

    Object.defineProperty(this, '__calc__', { value: calcFn })
    return this
  }

  Object.defineProperty(type, 'calc', {
    value: assignmentFn.bind(type)
  })
}

function defineValidateAssinment(type) {
  function assignmentFn(validateFn) {
    if (typeof validateFn !== 'function') {
      throw new Error('Specify function in `validate`')
    }

    if (this.__validators__ == null) {
      Object.defineProperty(this, '__validators__', { value: [] })
    }
    this.__validators__.push(validateFn)

    return this
  }

  Object.defineProperty(type, 'validate', {
    value: assignmentFn.bind(type)
  })
}
