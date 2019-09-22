import React from 'react'
import renderValue from './renderValue'

export default function renderArray(value, hints) {
  return (
    <span className="rf-array">
      {value.map((val, idx) => (
        <span key={idx} className="rf-array-element">
          {renderValue(val, hints)}
        </span>
      ))}
    </span>
  )
}
