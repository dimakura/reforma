import React from 'react'
import { startCase } from 'lodash'

export default function labelForField(fld) {
  const fieldName = do {
    if (typeof fld === 'string') {
      fld
    } else if ('name' in fld) {
      fld.name
    }
  }

  const fieldLabel = do {
    if (typeof fld === 'string') {
      startCase(fld)
    } else if ('label' in fld) {
      fld.label
    } else {
      startCase(fld.name)
    }
  }

  return (
    <label htmlFor={fieldName}>{fieldLabel}</label>
  )
}
