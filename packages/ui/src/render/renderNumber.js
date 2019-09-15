import React from 'react'
import numeral from 'numeral'

const formats = [
  '0,0',
  '0,0.0',
  '0,0.00',
  '0,0.000',
  '0,0.0000',
  '0,0.00000',
  '0,0.000000',
  '0,0.0000000',
  '0,0.00000000',
  '0,0.000000000',
  '0,0.0000000000'
]

export default function renderNumber(value, hints) {
  const decimals = do {
    if (hints.length > 0) {
      const num = parseInt(hints[0], 10)
      if (Number.isFinite(num)) {
        num
      } else {
        0
      }
    } else {
      0
    }
  }

  const format = do {
    if (formats.length > decimals) {
      formats[decimals]
    } else {
      formats[formats.length - 1]
    }
  }

  return (
    <code className="rf-number">{numeral(value).format(format)}</code>
  )
}
