import React from 'react'
import { default as MUITableBody } from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Data extends React.PureComponent {
  render() {
    const { columns, data } = this.props

    return (
      <MUITableBody>
        {data.map(model => {
          return (
            <TableRow key={model.id}>
              {columns.map(col => {
                return (
                  <TableCell key={col.field.name}>
                    {col.getFormattedValue(model)}
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

export default Data
