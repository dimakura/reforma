import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import isPresent from 'reforma/utils/isPresent'
import editorProps from './editorProps'

class TextEditor extends React.PureComponent {
  render() {
    const {
      value,
      column,
      error,
      classes
    } = this.props

    return (
      <TextField
        className={classes.textField}
        label={column.getCaption()}
        value={value || ''}
        onChange={this.onChange.bind(this)}
        error={isPresent(error)}
        helperText={error}
      />
    )
  }

  onChange(evt) {
    const { onChange, column } = this.props
    onChange(column.field, evt.target.value)
  }
}

TextEditor.propTypes = editorProps

const styles = {
  textField: {
    marginBottom: 16
  }
}

export default withStyles(styles)(TextEditor)
