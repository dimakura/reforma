import { get, startCase } from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import notBlank from 'reforma/utils/notBlank'

const supportedTypes = [
  'string',
  'date',
  'number',
  'integer'
]

export default function createFieldType(data) {
  if (data != null) {
    if (typeof data === 'string') {
      return createFieldType({
        name: data
      })
    } else if (
      typeof data === 'object' &&
      supportedTypes.includes(data.name)
    ) {
      return createFieldTypeInternal(data)
    }
  }
}

// -- PRIVATE

function createFieldTypeInternal(data) {
  return do {
    if (data.name === 'string') {
      createStringType(data)
    } else if (data.name === 'date') {
      createDateType(data)
    } else if (data.name === 'number') {
      createNumberType(data)
    } else if (data.name === 'integer') {
      createNumberType({
        ...data,
        decimals: 0
      })
    }
  }
}

// -- STRING

function createStringType(data) {
  return {
    name: 'string',
    formatValue: function (val) {
      if (val != null) {
        return val.toString()
      }
    }
  }
}

// -- NUMBER

const minDecimals = 0
const maxDecimals = 4
const numeralFormats = [
  '0,0',
  '0,0.0',
  '0,0.00',
  '0,0.000',
  '0,0.0000'
]

function createNumberType(data) {
  const decimals = do {
    const given = notBlank(data.decimals, 2)

    if (given < minDecimals) {
      minDecimals
    } else if (given > maxDecimals) {
      maxDecimals
    } else {
      given
    }
  }

  const format = numeralFormats[decimals]

  return {
    name: 'number',
    decimals,
    formatValue: function (val) {
      return numeral(val).format(format)
    }
  }
}

// -- DATE

function createDateType(data) {
  const format = notBlank(data.format, 'DD-MMM-YYYY hh:mm:ss')

  return {
    name: 'date',
    format,
    formatValue: function (val) {
      return moment(val).format(format)
    }
  }
}
