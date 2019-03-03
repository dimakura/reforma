import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import isPresent from 'reforma/utils/isPresent'
import { withStyles } from '@material-ui/core/styles'

class Data extends React.PureComponent {
  render() {
    const { columns, model, classes, recordDataSource } = this.props

    return (
      <Table>
        <TableBody>
          {columns.map(col => {
            return (
              <TableRow key={col.field.name}>
                <TableCell variant="head" width="200">
                  {col.getCaption()}
                </TableCell>
                <TableCell>
                  {
                    do {
                      if (isPresent(col.field.prefix)) {
                        (<span className={classes.prefix}>{col.field.prefix}</span>)
                      }
                    }
                  }
                  {col.getFormattedValue(model, recordDataSource)}
                  {
                    do {
                      if (isPresent(col.field.suffix)) {
                        (<span className={classes.suffix}>{col.field.suffix}</span>)
                      }
                    }
                  }
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

const styles = (theme) => ({
  prefix: {
    display: 'inline-block',
    marginRight: theme.spacing.unit,
    color: theme.palette.grey[500]
  },

  suffix: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
})

export default withStyles(styles)(Data)
