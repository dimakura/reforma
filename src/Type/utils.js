import { Map } from 'immutable'

/**
 * Type is an immutable map with `isType: true` property.
 */
export function isType(type) {
  return do {
    if (type == null) {
      false
    } else if (!Map.isMap(type)) {
      false
    } else {
      type.get('isType') === true
    }
  }
}

/**
 * Primitive type is a type with `isPrimitiveType: true` property.
 */
export function isPrimitiveType(type) {
  return do {
    if (!isType(type)) {
      false
    } else {
      type.get('isPrimitiveType') === true
    }
  }
}

/**
 * Serializes value for the given type.
 */
export function serialize(type, value) {
  if (!isType(type)) {
    throw 'Cannot serialize: not a type'
  }

  const serializeFunction = type.get('serialize')

  if (typeof serializeFunction !== 'function') {
    throw 'Cannot serialize: no serializer function'
  }

  return serializeFunction(value)
}

/**
 * Deserializes value into the given type.
 */
export function deserialize(type, value) {
  if (!isType(type)) {
    throw 'Cannot deserialize: not a type'
  }

  const deserializeFunction = type.get('deserialize')

  if (typeof deserializeFunction !== 'function') {
    throw 'Cannot deserialize: no deserializer function'
  }

  return deserializeFunction(value)
}
