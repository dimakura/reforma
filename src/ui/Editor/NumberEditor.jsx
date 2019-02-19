import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'
import isPresent from 'reforma/utils/isPresent'
import editorProps from './editorProps'

class NumberEditor extends React.PureComponent {
  render() {
    const {
      value,
      column,
      error,
      classes
    } = this.props

    const hasError = do {
      if (
        value != null &&
        isNaN(Number(value))
      ) {
        true
      } else {
        isPresent(error)
      }
    }

    const prefix = do {
      if (isPresent(column.field.prefix)) {
        <InputAdornment variant="filled" position="start">
          {column.field.prefix}
        </InputAdornment>
      }
    }

    const suffix = do {
      if (isPresent(column.field.suffix)) {
        <InputAdornment variant="filled" position="end">
          {column.field.suffix}
        </InputAdornment>
      }
    }

    return (
      <TextField
        className={classes.textField}
        label={column.getCaption()}
        value={value || ''}
        onChange={this.onChange.bind(this)}
        error={hasError}
        helperText={error}
        InputProps={{
          startAdornment: prefix,
          endAdornment: suffix
        }}
      />
    )
  }

  onChange(evt) {
    const { onChange, column } = this.props
    onChange(column.field, evt.target.value)
  }
}

NumberEditor.propTypes = editorProps

const styles = {
  textField: {
    marginBottom: 16
  }
}

export default withStyles(styles)(NumberEditor)
