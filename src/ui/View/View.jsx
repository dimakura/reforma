import React from 'react'
import PropTypes from 'prop-types'
import { EVENT_STATUS_CHANGED } from 'reforma/datasource/RecordDataSource'
import ViewBase from './ViewBase'
import ViewData from './ViewData'

class View extends React.PureComponent {
  componentDidMount() {
    this.initialLoad()
  }

  render() {
    const { columns, recordDataSource } = this.props

    return (
      <ViewBase
        recordDataSource={recordDataSource}
        renderer={() => (
          <ViewData
            recordDataSource={recordDataSource}
            columns={columns}
          />
        )}
      />
    )
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
