import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'
import DataSourceComponent from './DataSourceComponent'

function isBusy(dataSource) {
  return dataSource.status === 'busy' || dataSource.status === 'initial'
}

class LoadingIndicator extends React.PureComponent {
  render() {
    const {
      dataSource,
      size
    } = this.props

    return (
      <DataSourceComponent
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
