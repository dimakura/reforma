import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import notBlank from 'reforma/utils/notBlank'

class TableHeader extends React.PureComponent {
  render() {
    const tableProps = this.props.tableProps

    return (
      <TableHead>
        <TableRow>
          {
            tableProps.columns.map(col => {
              return (
                <TableCell key={col.field.name}>
                  { notBlank(col.caption, col.field.caption) }
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
  tableProps: PropTypes.object.isRequired
}

export default TableHeader
