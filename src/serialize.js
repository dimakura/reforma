import isType from './isType'
import { getType } from './registry'

/**
 * Serializes value for the given type.
 */
export default function serialize(type, value) {
  if (typeof type === 'string') {
    type = getType(type)
  }

  if (!isType(type)) {
    throw 'Cannot serialize: not a type'
  }

  const serializeFunction = type.get('serialize')

  if (typeof serializeFunction !== 'function') {
    throw 'Cannot serialize: no serializer function'
  }

  return serializeFunction(value)
}
