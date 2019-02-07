import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

class Total extends React.PureComponent {
  render() {
    const {
      classes,
      total
    } = this.props

    return do {
      if (total < 0) {
        null
      } else {
        (
          <div className={classes.root}>
            <Typography>
              <strong>{total}</strong> {total == 1 ? 'record' : 'records'}
            </Typography>
          </div>
        )
      }
    }
  }
}

const styles = {
  root: {
    flexGrow: 1
  }
}

export default withStyles(styles)(Total)
