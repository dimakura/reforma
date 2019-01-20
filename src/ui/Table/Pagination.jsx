import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { withStyles } from '@material-ui/core/styles'

class Pagination extends React.PureComponent {
  render() {
    const {
      classes,
      tableDataSource,
      perPage
    } = this.props

    const page = get(tableDataSource, 'params.page')

    if (page == null) {
      return null
    }

    const total = tableDataSource.total
    const maxPages = Math.ceil(total / perPage)

    if (maxPages < 2) {
      return null
    }

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.onPrevPage.bind(this)}
          disabled={page < 2}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>

        <Typography className={classes.pages}>
          Page {page} / {maxPages}
        </Typography>

        <IconButton
          onClick={this.onNextPage.bind(this)}
          disabled={page > maxPages - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </div>
    )
  }

  onPrevPage() {
    const { onChange, tableDataSource } = this.props
    const page = get(tableDataSource, 'params.page')

    onChange(page - 1)
  }

  onNextPage() {
    const { onChange, tableDataSource } = this.props
    const page = get(tableDataSource, 'params.page')

    onChange(page + 1)
  }
}

Pagination.propTypes = {
  tableDataSource: PropTypes.object.isRequired,
  perPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing.unit
  },

  pages: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  status: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

export default withStyles(styles)(Pagination)
