import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'
import CollectionComponent from './CollectionComponent'

function isBusy(dataSource) {
  return dataSource.status === 'fetching' || dataSource.status === 'initial'
}

class LoadingIndicator extends React.PureComponent {
  render() {
    const {
      dataSource,
      size
    } = this.props

    return (
      <CollectionComponent
        autofetch={false}
        cached={true}
        dataSource={dataSource}
        render={() => {
          return do {
            if (isBusy(dataSource)) {
              <Spinner size={size} />
            } else {
              null
            }
          }
        }}
      />
    )
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
