export const primitiveTypes = ['integer', 'float', 'string', 'bool', 'datetime']

export function createPrimitiveType(name) {
  const type = {}
  defineTypeName(type, name)
  defineBuiltInType(type)
  defineIdAssignment(type)
  defineCalcAssignment(type)
  defineValidateAssinment(type)

  return type
}

// -- PRIVATE

function defineTypeName(type, name) {
  if (primitiveTypes.indexOf(name) === -1) {
    throw new Error(`Not a primitive type: ${name}`)
  }

  Object.defineProperty(type, 'name', { value: name })
}

function defineBuiltInType(type) {
  Object.defineProperty(type, '__isType__', { value: true })
  Object.defineProperty(type, '__isBuiltInType__', { value: true })
  Object.defineProperty(type, '__isUserDefinedType__', { value: false })
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
