import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

class Toolbar extends React.PureComponent {
  render() {
    const {
      classes,
      children
    } = this.props

    return (
      <div className={classes.root}>
        {children}
      </div>
    )
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: 2 * theme.spacing.unit,
    height: 48
  }
})

export default withStyles(styles)(Toolbar)
