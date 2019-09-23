import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup } from '@blueprintjs/core'

export default function stringEditor(props) {
  const { value, onChange, fieldName, spec } = props

  return (
    <InputGroup
      id={fieldName}
      defaultValue={value}
      onChange={(evt) => onChange(evt.target.value)}
      placeholder={spec.placeholder}
      autoFocus={spec.autoFocus === true}
    />
  )
}

stringEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired
}
