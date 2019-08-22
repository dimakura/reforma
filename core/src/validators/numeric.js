export function greaterThan(number, opts = {}) {
  return createNumericValidator(
    (value, number) => (value > number),
    `should be greater than ${number}`,
    number,
    opts
  )
}

export function greaterOrEqualTo(number, opts = {}) {
  return createNumericValidator(
    (value, number) => (value >= number),
    `should be greater or equal to ${number}`,
    number,
    opts
  )
}

export function lessThan(number, opts = {}) {
  return createNumericValidator(
    (value, number) => (value < number),
    `should be less than ${number}`,
    number,
    opts
  )
}

export function lessOrEqualTo(number, opts = {}) {
  return createNumericValidator(
    (value, number) => (value <= number),
    `should be less or equal to ${number}`,
    number,
    opts
  )
}

// -- PRIVATE

function createNumericValidator(compFn, defaultMessage, number, opts) {
  number = parseNumber(number)

  if (number == null) {
    throw new Error('Specify number as a first argument in numberic validator')
  }

  const allowBlank = do {
    if ('allowBlank' in opts) {
      opts.allowBlank
    } else {
      false
    }
  }

  const message = do {
    if ('message' in opts) {
      opts.message
    } else {
      defaultMessage
    }
  }

  return function (_field, value) {
    return do {
      if (value == null && allowBlank) {
        null
      } else {
        value = parseNumber(value)

        if (Number.isFinite(value)) {
          if (!compFn(value, number)) {
            message
          } else {
            null
          }
        } else {
          'not a number'
        }
      }
    }
  }
}

function parseNumber(number) {
  number = parseFloat(number)

  return do {
    if (Number.isFinite(number)) {
      number
    }
  }
}
