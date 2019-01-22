import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Data extends React.PureComponent {
  render() {
    const { columns, model } = this.props

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
                  {col.getFormattedValue(model)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

export default Data
