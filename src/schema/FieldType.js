import React from 'react'
import { get, startCase } from 'lodash'
import numeral from 'numeral'
import moment from 'moment'
import notBlank from 'reforma/utils/notBlank'

const supportedTypes = [
  'string',
  'date',
  'number',
  'integer',
  'image'
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
    } else if (
      data != null &
      data._isSchema
    ) {
      return createFieldTypeInternal({
        name: 'Schema',
        schema: data
      })
    }
  }
}

// -- PRIVATE

function createFieldTypeInternal(data) {
  const type = do {
    if (data.name === 'Schema') {
      createSchemaType(data)
    } else if (data.name === 'string') {
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
    } else if (data.name === 'image') {
      createImageType(data)
    }
  }

  Object.defineProperty(type, '_isFieldType', {
    value: true,
    writable: false
  })

  return type
}

// -- SCHEMA

function createSchemaType(data) {
  return {
    name: 'Schema',
    formatValue: function(val) {
      return val.toString()
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

// -- IMAGE

function createImageType(data) {
  return {
    name: 'image',
    formatValue: function(val) {
      return (
        <a href={val} target="_blank" rel="noopener noreferrer">
          <img
            src={val}
            style={{ maxHeight: 200, maxWidth: 200 }}
          />
        </a>
      )
    }
  }
}
