import { snakeCase } from './helpers'

export function serializeType(type, value, fields) {
  return do {
    if (value == null) {
      null
    } else if (type.__isPrimitiveType__) {
      if (type.name === 'integer') {
        serializeNumber(value)
      } else if (type.name === 'float') {
        serializeNumber(value)
      } else if (type.name === 'string') {
        serializeString(value)
      } else if (type.name === 'bool') {
        serializeBool(value)
      } else if (type.name === 'datetime') {
        serializeDatetime(value)
      } else {
        throw new Error(`Unknown primitive type: ${type.name}`)
      }
    } else if (type.__isArray__) {
      serializeArray(type, value, fields)
    } else if (type.__isMap__) {
      serializeMap(type, value, fields)
    } else if (type.__isUserDefinedType__) {
      serializeUserDefinedType(type, value, fields)
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
  }
}

// -- PRIVATE

function serializeNumber(value) {
  return do {
    if (Number.isFinite(value)) {
      value
    } else {
      null
    }
  }
}

function serializeString(value) {
  return value.toString()
}

function serializeBool(value) {
  return do {
    if (value === true) {
      true
    } else if (value === false) {
      false
    } else {
      null
    }
  }
}

function serializeDatetime(value) {
  return do {
    if (value instanceof Date) {
      value.toJSON()
    } else {
      null
    }
  }
}

function serializeArray(type, value, fields) {
  return do {
    if (Array.isArray(value)) {
      value.map((v) => serializeType(type.valueType, v, fields))
    } else {
      null
    }
  }
}

function serializeMap(type, value, fields) {
  if (fields == null || typeof fields !== 'object') {
    fields = {}
  }

  return do {
    if (typeof value === 'object') {
      const serialized = {}
      const names = Object.getOwnPropertyNames(value)
      for (let i = 0; i < names.length; i++) {
        const name = names[i]
        serialized[name] = serializeType(type.valueType, value[name], fields[name])
      }
      return serialized
    } else {
      null
    }
  }
}

function serializeUserDefinedType(type, value, fields) {
  return do {
    if (typeof value === 'object') {
      const serialized = {}
      const baseFields = do {
        if (Array.isArray(fields)) {
          fields
        } else if (fields != null && typeof fields === 'object') {
          if ('__base__' in fields) {
            fields.__base__
          } else {
            []
          }
        } else {
          []
        }
      }
      const propFields = do {
        if (fields != null && typeof fields === 'object') {
          fields
        } else {
          ({})
        }
      }
      const typeFields = type.getFields()
      const fieldNames = do {
        if (baseFields.length > 0) {
          baseFields
        } else {
          Object.getOwnPropertyNames(typeFields)
        }
      }

      for (let i = 0; i < fieldNames.length; i++) {
        const field = typeFields[fieldNames[i]]
        const name = field.getName()
        if (!field.isCalculable) {
          serialized[snakeCase(name)] = serializeType(
            field.getType(),
            value[name],
            propFields[name]
          )
        }
      }

      serialized
    } else {
      null
    }
  }
}
