import React from 'react'
import PropTypes from 'prop-types'

class CollectionComponent extends React.PureComponent {
  componentDidMount() {
    let counter = 0
    const { autofetch, cached, initialParams, dataSource } = this.props
    const status = dataSource.status
    const isInitial = status === 'initial'
    const isBusy = status === 'fetching'

    this.unsubscribe = dataSource.addStatusListener((oldStatus, newStatus) => {
      counter += 1

      this.setState({
        status: newStatus,
        shakeTree: counter
      })
    })

    if (isInitial && autofetch) {
      dataSource.fetch(initialParams)
    } else if (!isBusy && !cached) {
      dataSource.refetch()
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return this.props.render()
  }
}

CollectionComponent.defaultProps = {
  autofetch: false,
  cached: true
}

CollectionComponent.propTypes = {
  autofetch: PropTypes.bool.isRequired,
  cached: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  initialParams: PropTypes.object
}

export default CollectionComponent
