import React from 'react'
import PropTypes from 'prop-types'
import { EVENT_STATUS_CHANGED } from 'reforma/datasource/RecordDataSource'
import ViewData from './ViewData'

class View extends React.PureComponent {
  constructor(props) {
    super(props)

    // this is a dummy counter to shake the tree
    this.state = {
      counter: 1
    }
  }

  componentDidMount() {
    this.addListeners()
    this.initialLoad()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  render() {
    const { columns, recordDataSource } = this.props
    const status = recordDataSource.status

    return (
      <div>
        <ViewData
          recordDataSource={recordDataSource}
          columns={columns}
          status={status}
        />
      </div>
    )
  }

  addListeners() {
    const { recordDataSource } = this.props
    const shakeView = () => {
      this.setState({
        counter: this.state.counter + 1
      })
    }

    this.removeStatusListener = recordDataSource.subscribe(EVENT_STATUS_CHANGED, shakeView)
  }

  removeListeners() {
    this.removeStatusListener()
  }

  initialLoad() {
    this.props.recordDataSource.fetch()
  }
}

View.propTypes = {
  schema: PropTypes.object.isRequired,
  recordDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
}

export default View
