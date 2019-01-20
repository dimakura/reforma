import React from 'react'
import isBlank from 'reforma/utils/isBlank'
import Loading from './Loading'
import NoData from './NoData'
import Data from './Data'

class TableBody extends React.PureComponent {
  render() {
    const { tableDataSource, columns } = this.props
    const { data, errors } = tableDataSource

    if (tableDataSource.isInitial) {
      return null
    } else if (tableDataSource.isInProgress && data == null) {
      return <Loading columns={columns} />
    } else if (isBlank(data)) {
      return <NoData columns={columns} />
    } else {
      return <Data data={data} columns={columns} />
    }
  }
}

export default TableBody
