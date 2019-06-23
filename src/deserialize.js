import isType from './isType'
import { getType } from './registry'

/**
 * Deserializes value into the given type.
 */
export default function deserialize(type, value) {
  if (typeof type === 'string') {
    type = getType(type)
  }

  if (!isType(type)) {
    throw 'Cannot deserialize: not a type'
  }

  const deserializeFunction = type.get('deserialize')

  if (typeof deserializeFunction !== 'function') {
    throw 'Cannot deserialize: no deserializer function'
  }

  return deserializeFunction(value)
}
