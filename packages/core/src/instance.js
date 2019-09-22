import { snakeCase } from './helpers'

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

// -- PRIVATE

function createInteger(value) {
  const parsedValue = parseInt(value, 10)

  return do {
    if (Number.isFinite(parsedValue)) {
      parsedValue
    } else {
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
        null
      }
    } else {
      null
    }
  }
}

function createArray(type, value) {
  return do {
    if (Array.isArray(value)) {
      value.map((v) => instantiateType(type.valueType, v))
    } else {
      const element = instantiateType(type.valueType, value)
      if (element == null) {
        null
      } else {
        [element]
      }
    }
  }
}

function createMap(type, value) {
  if (typeof value !== 'object') {
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

function createUserDefinedType(type, data) {
  const instance = {}
  const fields = type.getFields()
  const fieldNames = Object.getOwnPropertyNames(fields)
  function getId() {
    const idFields = type.getIdFields()

    return do {
      if (
        idFields == null ||
        idFields.length === 0
      ) {
        null
      } else {
        idFields.map(fld => instance[fld.getName()])
      }
    }
  }

  Object.defineProperty(instance, '__data__', { value: {} })
  Object.defineProperty(instance, '__type__', { value: type })
  Object.defineProperty(instance, 'getId', { value: getId })

  function definePlainProp(field) {
    const name = field.getName()
    const type = field.getType()

    Object.defineProperty(instance, name, {
      get: function () {
        return instance.__data__[name]
      },

      set: function (newValue) {
        if (type.__isUserDefinedType__) {
          newValue = do {
            if (newValue == null) {
              null
            } else if (newValue.__type__ === type) {
              newValue
            } else {
              instantiateType(type, newValue)
            }
          }
        } else {
          newValue = instantiateType(type, newValue)
        }

        instance.__data__[name] = newValue
      }
    })
  }

  function defineCalcProp(field) {
    const name = field.getName()
    const calcFn = field.getCalc()

    Object.defineProperty(instance, name, {
      get: function () {
        return calcFn(instance)
      }
    })
  }

  for (let i = 0; i < fieldNames.length; i++) {
    const field = fields[fieldNames[i]]

    if (field.isCalculable) {
      defineCalcProp(field)
    } else {
      definePlainProp(field)

      const name = field.getName()
      instance.__data__[name] = instantiateType(
        field.getType(),
        data[snakeCase(name)]
      )
    }
  }

  return instance
}
