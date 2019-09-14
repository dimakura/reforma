const defaultMessage = 'cannot be empty'

export default function presence(opts = {}) {
  const message = do {
    if ('message' in opts) {
      opts.message
    } else {
      defaultMessage
    }
  }

  return function (value, field) {
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
