import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Data from './Data'

class ViewData extends React.PureComponent {
  render() {
    const { recordDataSource, columns } = this.props
    const { model, errors } = recordDataSource

    return do {
      if (recordDataSource.isInitial) {
        null
      } else if (recordDataSource.isInProgress && model == null) {
        <Loading />
      } else {
        <Data
          model={model}
          columns={columns}
          recordDataSource={recordDataSource}
        />
      }
    }
  }
}

ViewData.propTypes = {
  recordDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired
}

export default ViewData
