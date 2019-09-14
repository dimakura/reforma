export default function inclusion(values, opts = {}) {
  const allowBlank = do {
    if ('allowBlank' in opts) {
      opts.allowBlank
    } else {
      false
    }
  }

  const defaultMessage = `not in [${values.join(', ')}]`

  const message = do {
    if ('message' in opts) {
      opts.message
    } else {
      defaultMessage
    }
  }

  return function (value, field) {
    return do {
      if (
        (value == null && allowBlank) ||
        values.includes(value)
      ) {
        null
      } else {
        message
      }
    }
  }
}
