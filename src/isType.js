import { Map } from 'immutable'

/**
 * Type is an immutable map with `isType: true` property.
 */
export default function isType(type) {
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
