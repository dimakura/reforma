import React from 'react'
import dateFormat from 'date-fns/format'

const shortFormat = 'MM/dd/yyyy'
const defaultFormat = 'MM/dd/yyyy HH:mm'
const longFormat = 'MM/dd/yyyy HH:mm:ss'

export default function renderNumber(value, hints) {
  const format = do {
    if (hints.length > 0) {
      const head = hints[0]

      if (head === 'short') {
        shortFormat
      } else if (head === 'default') {
        defaultFormat
      } else if (head === 'long') {
        longFormat
      } else {
        head
      }
    } else {
      defaultFormat
    }
  }

  return (
    <span className="rf-date">{dateFormat(value, format)}</span>
  )
}
