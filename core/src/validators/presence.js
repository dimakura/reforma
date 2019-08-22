const defaultMessage = 'cannot be empty'

export default function presence(opts = {}) {
  return function (value, field) {
    return do {
      if (isBlank(value)) {
        if ('message' in opts) {
          opts.message
        } else {
          defaultMessage
        }
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
