import React from 'react'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

class ImageEditor extends React.PureComponent {
  render() {
    const {
      value,
      column,
      classes
    } = this.props

    return (
      <FormControl>
        <FormLabel component="legend">
          {column.getCaption()}
        </FormLabel>
        <Button
          variant="outlined"
          component="label"
          className={classes.button}
          classes={{
            label: classes.buttonLabel
          }}
        >
          {
            do {
              if (value != null) {
                value.name
              } else {
                'Choose File...'
              }
           }
          }

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={this.onChange.bind(this)}
          />
        </Button>
      </FormControl>
    )
  }

  onChange(evt) {
    const { onChange, column } = this.props

    onChange(column.field, evt.target.files[0])
  }
}

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit
  },

  buttonLabel: {
    justifyContent: 'flex-start'
  }
})

export default withStyles(styles)(ImageEditor)
