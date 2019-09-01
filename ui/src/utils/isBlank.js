/**
 * An object is blank if it’s `false`, empty, or a whitespace string.
 * For example, `false`, `''`, `' '`, `null`, `[]`, and `{}` are all blank.
 */
export default function isBlank(value) {
  return do {
    if (value == null) {
      true
    } else if (value === false) {
      true
    } else if (isEmptyString(value)) {
      true
    } else if (isEmptyArray(value)) {
      true
    } else if (!isPlainObject(value)) { // e.g. new Date()
      false
    } else if (hasNoProperties(value)) {
      true
    } else {
      false
    }
  }
}

// -- PRIVATE

function isEmptyString(value) {
  return typeof value === 'string' && value.trim() === ''
}

function isEmptyArray(value) {
  return Array.isArray(value) && value.length === 0
}

function isPlainObject(value) {
  return value.constructor == null || value.constructor.name === 'Object'
}

function hasNoProperties(value) {
  return typeof value === 'object' && Object.keys(value).length === 0
}
