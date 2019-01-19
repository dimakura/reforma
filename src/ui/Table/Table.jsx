import React from 'react'
import PropTypes from 'prop-types'
import { default as MUITable} from '@material-ui/core/Table'
import TableHeader from './TableHeader'

class Table extends React.PureComponent {
  render() {
    const tableProps = this.props.tableProps

    return (
      <MUITable>
        <TableHeader tableProps={tableProps} />
      </MUITable>
    )
  }

  fetchData(params) {
    //
  }
}

Table.propTypes = {
  tableProps: PropTypes.object.isRequired
}

export default Table
