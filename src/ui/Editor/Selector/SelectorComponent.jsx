import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import isPresent from 'reforma/utils/isPresent'
import SelectorDialog from './SelectorDialog'

class SelectorComponent extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dialogOpen: false
    }
  }

  render() {
    const {
      value,
      column,
      error,
      selectorProps,
      classes
    } = this.props

    return (
      <div className={classes.root}>
        <TextField
          className={classes.input}
          label={column.getCaption()}
          value={selectorProps.formatValue(value)}
          disabled
          error={isPresent(error)}
          helperText={error}
        />

        <Button
          variant="outlined"
          onClick={this.openDialog.bind(this)}
        >
          Change...
        </Button>

        <SelectorDialog
          {...selectorProps}
          open={this.state.dialogOpen}
          closeDialog={this.closeDialog.bind(this)}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }

  openDialog() {
    this.setState({
      dialogOpen: true
    })
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    })
  }

  onChange(model) {
    const { onChange, column } = this.props
    onChange(column.field, model)
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },

  input: {
    flexGrow: 1
  }
}

export default withStyles(styles)(SelectorComponent)
