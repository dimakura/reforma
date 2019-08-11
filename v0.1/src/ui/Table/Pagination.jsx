import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
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

    const preventNext = page > maxPages - 1
    const preventPrev = page < 2

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.onFirstPage.bind(this)}
          disabled={preventPrev}
        >
          <FirstPage />
        </IconButton>

        <IconButton
          onClick={this.onPrevPage.bind(this)}
          disabled={preventPrev}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>

        <Typography className={classes.pages}>
          Page {page} / {maxPages}
        </Typography>

        <IconButton
          onClick={this.onNextPage.bind(this)}
          disabled={preventNext}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.onLastPage.bind(this)}
          disabled={preventNext}
        >
          <LastPage />
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

  onFirstPage() {
    this.props.onChange(1)
  }

  onLastPage() {
    const { tableDataSource, perPage } = this.props
    const total = tableDataSource.total
    const maxPages = Math.ceil(total / perPage)

    this.props.onChange(maxPages)
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
    alignItems: 'center'
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
