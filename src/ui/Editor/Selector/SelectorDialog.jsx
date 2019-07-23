import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { Table } from 'reforma'

class SelectorDialog extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  render() {
    const {
      open,
      closeDialog,
      modalTitle,
      dataSource,
      formatValue,
      classes
    } = this.props

    const {
      query
    } = this.state

    const columns = [{
      name: 'id',
      renderer: (model) => {
        return (
          <a
            href="#"
            onClick={this.onSelect.bind(this, model)}
          >
            {formatValue(model)}
          </a>
        )
      }
    }]

    return (
      <Dialog open={open} >
        <DialogTitle
          className={classes.title}
          disableTypography
        >
          <Typography variant="h6">{modalTitle}</Typography>
          <IconButton
            className={classes.closeButton}
            onClick={closeDialog}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className={classes.content}>
          <InputBase
            placeholder="Search..."
            value={query || ''}
            classes={{
              root: classes.searchInputRoot,
              input: classes.searchInputInput
            }}
            onChange={this.onChange.bind(this)}
          />
          <Table
            showHeader={false}
            tableDataSource={dataSource}
            columns={columns}
            perPage={5}
          />
        </DialogContent>
      </Dialog>
    )
  }

  addListeners() {
    const tableDS = this.props.dataSource

    const shakeView = () => {
      const query = tableDS.params.query

      this.setState({
        query
      })
    }

    this.unsubscribeParamsListener = tableDS.subscribe(
      'params-changed',
      shakeView
    )
  }

  removeListeners() {
    this.unsubscribeParamsListener()
  }

  onChange(evt) {
    const tableDS = this.props.dataSource

    const params = {
      ...tableDS.params,
      page: 1,
      query: evt.target.value
    }

    tableDS.fetch(params)
  }

  onSelect(model, evt) {
    evt.preventDefault()

    this.props.onChange(model)
    this.props.closeDialog()
  }
}

const styles = theme => ({
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  },

  content: {
    padding: 0,
    width: 500
  },

  searchInputRoot: {
    color: 'inherit',
    width: 500,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },

  searchInputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  }
})

export default withStyles(styles)(SelectorDialog)
