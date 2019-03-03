import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import isPresent from 'reforma/utils/isPresent'

class BoolEditor extends React.PureComponent {
  render() {
    const {
      value,
      column
    } = this.props

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={value || false}
            onChange={this.onChange.bind(this)}
            color="primary"
          />
        }
        label={column.getCaption()}
      />
    )
  }

  onChange(evt, checked) {
    const { onChange, column } = this.props
    onChange(column.field, checked)
  }
}

export default BoolEditor
