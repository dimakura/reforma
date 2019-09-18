import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

class DataSourceComponent extends React.PureComponent {
  componentDidMount() {
    let counter = 0
    const { autofetch, cached, params, dataSource } = this.props
    const status = dataSource.status
    const isInitial = status === 'initial'
    const isBusy = status === 'busy'

    this.unsubscribe = dataSource.addStatusListener((oldStatus, newStatus) => {
      counter += 1

      this.setState({
        status: newStatus,
        shakeTree: counter // do we need this?
      })
    })

    if (isInitial && autofetch) {
      dataSource.fetch(params)
    } else if (dataSource.__isCollectionDS__ && !isBusy && !cached) {
      // collection datasource is usually used for the same table
      // we just need to refetch with existing parameters
      dataSource.refetch()
    } else if (dataSource.__isRecordDS__) {
      if (
        (!isBusy && !cached) || // same as in collection DS
        (params != null && !isEqual(params, dataSource.params)) // this is case when we changed record
      ) {
        // just refetching is not enough here
        // as we might require different record
        dataSource.fetch(params)
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return this.props.render()
  }
}

DataSourceComponent.defaultProps = {
  autofetch: false,
  cached: true
}

DataSourceComponent.propTypes = {
  autofetch: PropTypes.bool.isRequired,
  cached: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  params: PropTypes.object
}

export default DataSourceComponent
