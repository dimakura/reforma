import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

export default function formatBool(value) {
  return do {
    if (value === true) {
      <Checkbox disabled checked />
    } else if (value === false) {
      <Checkbox disabled />
    } else {
      <Checkbox disabled indeterminate />
    }
  }
}
