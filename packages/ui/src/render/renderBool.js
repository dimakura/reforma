import React from 'react'
import isPresent from '@reforma/ui/utils/isPresent'

export default function renderBool(value, hints) {
  const [yes, no] = do {
    if (hints.length === 2) {
      hints
    } else {
      ['Yes', 'No']
    }
  }

  const text = do {
    if (isPresent(value)) {
      yes
    } else {
      no
    }
  }

  return (
    <span className="rf-bool">{text}</span>
  )
}
