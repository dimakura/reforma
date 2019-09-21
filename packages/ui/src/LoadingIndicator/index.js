import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'
import CollectionComponent from '../CollectionComponent'
import RecordComponent from '../RecordComponent'

class LoadingIndicator extends React.PureComponent {
  render() {
    const { dataSource, size } = this.props
    const isBusy = dataSource.status === 'busy' || dataSource.status === 'initial'
    const props = {
      autofetch: false,
      cached: true,
      dataSource: dataSource,
      render: () => {
        return do {
          if (isBusy) {
            <Spinner size={size} />
          } else {
            null
          }
        }
      }
    }

    return do {
      if (dataSource.__isCollectionDS__) {
        <CollectionComponent {...props} />
      } else {
        <RecordComponent {...props} />
      }
    }
  }
}

LoadingIndicator.defaultProps = {
  size: 16
}

LoadingIndicator.propTypes = {
  dataSource: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

export default LoadingIndicator
