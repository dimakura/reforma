import { get, startCase } from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

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
      createNumberType({ ...data, decimals: 0 })
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

const numeralFormats = [
  '0,0',
  '0,0.0',
  '0,0.00',
  '0,0.000',
  '0,0.0000'
]

function createNumberType(data) {
  const decimals = get(data, 'decimals', 2)
  const format = numeralFormats[decimals] || numeralFormats[2]

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
  const format = get(data, 'format', 'DD-MMM-YYYY hh:mm:ss')

  return {
    name: 'date',
    format,
    formatValue: function (val) {
      return moment(val).format(format)
    }
  }
}
