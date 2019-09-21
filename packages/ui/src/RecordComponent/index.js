import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'

class RecordComponent extends React.PureComponent {
  componentDidMount() {
    const { autofetch, cached, id, dataSource } = this.props
    const status = dataSource.status
    const isInitial = status === 'initial'
    const isBusy = status === 'busy'
    const changedId = !isEqual(dataSource.id, dataSource.normalizeId(id))
    const shouldFetch = do {
      if (isInitial && autofetch) {
        // when in initial state
        // and autofetch is enabled
        true
      } else if (!isBusy && !cached) {
        // when not busy
        // and we not reusing cache
        true
      } else if (changedId && autofetch) {
        // when ID is changed
        // and autofetch is enabled
        true
      } else {
        false
      }
    }

    let counter = 0
    this.unsubscribe = dataSource.addStatusListener((oldStatus, newStatus) => {
      counter += 1

      this.setState({
        status: newStatus,
        shakeTree: counter
      })
    })

    if (shouldFetch) {
      dataSource.fetch(id)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return this.props.render()
  }
}

RecordComponent.defaultProps = {
  autofetch: false,
  cached: true
}

RecordComponent.propTypes = {
  autofetch: PropTypes.bool.isRequired,
  cached: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  id: PropTypes.any
}

export default RecordComponent
