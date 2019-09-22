import React from 'react'

export default function renderString(value, hints) {
  return (
    <span className="rf-string">{value.toString()}</span>
  )
}
