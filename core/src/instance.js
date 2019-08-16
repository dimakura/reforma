var debug = require('debug')('reforma')

export function instantiateType(type, value) {
  return do {
    if (value == null) {
      null
    } else if (type.__isPrimitiveType__) {
      if (type.name === 'integer') {
        createInteger(value)
      } else if (type.name === 'float') {
        createFloat(value)
      } else if (type.name === 'string') {
        createString(value)
      } else if (type.name === 'bool') {
        createBool(value)
      } else if (type.name === 'datetime') {
        createDatetime(value)
      } else {
        throw new Error(`Unknown primitive type: ${type.name}`)
      }
    } else if (type.__isArray__) {
      createArray(type, value)
    } else if (type.__isMap__) {
      createMap(type, value)
    } else if (type.__isUserDefinedType__) {
      createUserDefinedType(type, value)
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
  }
}

function createInteger(value) {
  const parsedValue = parseInt(value, 10)

  return do {
    if (Number.isFinite(parsedValue)) {
      parsedValue
    } else {
      debug(`[WARNING] Not a finite integer: ${value}`)
      null
    }
  }
}

function createFloat(value) {
  const parsedValue = parseFloat(value)

  return do {
    if (Number.isFinite(parsedValue)) {
      parsedValue
    } else {
      debug(`[WARNING] Not a finite float: ${value}`)
      null
    }
  }
}

function createString(value) {
  return value.toString()
}

function createBool(value) {
  return do {
    if (value === true || value === 1) {
      true
    } else if (value === false || value === 0) {
      false
    } else {
      debug(`[WARNING] Not a proper bool: ${value}`)
      null
    }
  }
}

function createDatetime(value) {
  return do {
    if (value instanceof Date) {
      value
    } else if (typeof value === 'string') {
      const parsedValue = Date.parse(value)

      if (Number.isFinite(parsedValue)) {
        new Date(parsedValue)
      } else {
        debug(`[WARNING] Not a proper date: ${value}`)
        null
      }
    } else {
      debug(`[WARNING] Not a proper date: ${value}`)
      null
    }
  }
}

function createArray(type, value) {
  return do {
    if (Array.isArray(value)) {
      value.map((v) => instantiateType(type.valueType, v))
    } else {
      [instantiateType(type.valueType, value)]
    }
  }
}

function createMap(type, value) {
  if (typeof value !== 'object') {
    debug(`[WARNING] Not a proper map type: ${value}`)
    return null
  }

  const inst = {}
  const names = Object.getOwnPropertyNames(value)
  for (let i = 0; i < names.length; i++) {
    const key = names[i]
    const val = value[key]
    inst[instantiateType(type.keyType, key)] = instantiateType(type.valueType, val)
  }
  return inst
}

function createUserDefinedType(type, value) {
  throw new Error('Not yet implemented')
}
