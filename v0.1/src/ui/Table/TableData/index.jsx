import React from 'react'
import PropTypes from 'prop-types'
import isBlank from 'reforma/utils/isBlank'
import Loading from './Loading'
import NoData from './NoData'
import Data from './Data'

class TableData extends React.PureComponent {
  render() {
    const { tableDataSource, columns } = this.props
    const { data, errors } = tableDataSource

    return do {
      if (tableDataSource.isInitial) {
        null
      } else if (tableDataSource.isInProgress && data == null) {
        <Loading columns={columns} />
      } else if (isBlank(data)) {
        <NoData columns={columns} />
      } else {
        <Data data={data} columns={columns} tableDataSource={tableDataSource} />
      }
    }
  }
}

TableData.propTypes = {
  tableDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired
}

export default TableData
