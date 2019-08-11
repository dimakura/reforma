import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

export default function formatBool(value) {
  return do {
    if (value === true) {
      <Checkbox disabled checked />
    } else if (value === false) {
      <Checkbox disabled checked={false} />
    } else {
      <Checkbox disabled checked={false} indeterminate />
    }
  }
}
