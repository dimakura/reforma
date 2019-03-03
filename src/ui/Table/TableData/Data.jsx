import React from 'react'
import { default as MUITableBody } from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import isPresent from 'reforma/utils/isPresent'
import { withStyles } from '@material-ui/core/styles'

class Data extends React.PureComponent {
  render() {
    const { columns, data, classes, tableDataSource } = this.props

    return (
      <MUITableBody>
        {data.map(model => {
          return (
            <TableRow key={model.id}>
              {columns.map(col => {
                return (
                  <TableCell key={col.field.name}>
                    {
                      do {
                        if (isPresent(col.field.prefix)) {
                          (<span className={classes.prefix}>{col.field.prefix}</span>)
                        }
                      }
                    }
                    {col.getFormattedValue(model, tableDataSource)}
                    {
                      do {
                        if (isPresent(col.field.suffix)) {
                          (<span className={classes.suffix}>{col.field.suffix}</span>)
                        }
                      }
                    }
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </MUITableBody>
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
