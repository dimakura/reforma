import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import notBlank from 'reforma/utils/notBlank'

class TableHeader extends React.PureComponent {
  render() {
    const columns = this.props.columns

    return (
      <TableHead>
        <TableRow>
          {
            columns.map(col => {
              return (
                <TableCell key={col.field.name}>
                  {col.getCaption()}
                </TableCell>
              )
            })
          }
        </TableRow>
      </TableHead>
    )
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired
}

export default TableHeader
