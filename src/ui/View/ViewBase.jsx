import React from 'react'
import PropTypes from 'prop-types'

class ViewBase extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 1
    }
  }

  componentDidMount() {
    const { recordDataSource } = this.props

    const shakeView = () => {
      this.setState({
        counter: this.state.counter + 1
      })
    }

    this.removeStatusListener = recordDataSource.subscribe(EVENT_STATUS_CHANGED, shakeView)
  }

  componentWillUnmount() {
    this.removeStatusListener()
  }

  render() {
    const { renderer } = this.props

    return renderer()
  }
}

ViewBase.propTypes = {
  recordDataSource: PropTypes.object.isRequired,
  renderer: PropTypes.func.isRequired
}

export default ViewBase
