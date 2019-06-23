import isType from './isType'

/**
 * Primitive type is a type with `isPrimitiveType: true` property.
 */
export default function isPrimitiveType(type) {
  return do {
    if (!isType(type)) {
      false
    } else {
      type.get('isPrimitiveType') === true
    }
  }
}
