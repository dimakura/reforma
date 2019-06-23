import isType from './isType'

/**
 * Serializes value for the given type.
 */
export default function serialize(type, value) {
  if (!isType(type)) {
    throw 'Cannot serialize: not a type'
  }

  const serializeFunction = type.get('serialize')

  if (typeof serializeFunction !== 'function') {
    throw 'Cannot serialize: no serializer function'
  }

  return serializeFunction(value)
}
