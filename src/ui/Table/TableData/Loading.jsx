import React from 'react'
import { default as MUITableBody } from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Loading extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <MUITableBody>
        <TableRow>
          <TableCell colSpan={columns.length}>
            Loading data...
          </TableCell>
        </TableRow>
      </MUITableBody>
    )
  }
}

export default Loading
