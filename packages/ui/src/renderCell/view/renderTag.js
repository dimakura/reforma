import React from 'react'
import renderValue from './renderValue'

const bpIntents = ['primary', 'success', 'warning', 'danger']

export default function renderTag(value, hints) {
  const classNames = ['rf-tag', 'bp3-tag', 'bp3-minimal']

  if (bpIntents.includes(hints[0])) {
    classNames.push(`bp3-intent-${hints.shift()}`)
  }

  return (
    <span className={classNames.join(' ')}>{renderValue(value, hints)}</span>
  )
}
