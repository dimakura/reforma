const defaultMessage = 'cannot be empty'

export default function presence(message = defaultMessage) {
  return function (field, value) {
    return do {
      if (isBlank(value)) {
        message
      } else {
        null
      }
    }
  }
}

// -- PRIVATE

function isBlank(value) {
  return do {
    if (value == null) {
      true
    } else if (typeof value === 'string' && value.trim().length === 0) {
      true
    } else if (Array.isArray(value) && value.length === 0) {
      true
    } else {
      false
    }
  }
}
