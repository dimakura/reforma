import React from 'react'
import PropTypes from 'prop-types'
import Fetching from './Fetching'
import Data from './Data'

class FormData extends React.PureComponent {
  render() {
    const { editRecordDataSource } = this.props

    return do {
      if (editRecordDataSource.isInitial) {
        null
      } else if (editRecordDataSource.isFetching) {
        <Fetching />
      } else if (
        editRecordDataSource.isReady ||
        editRecordDataSource.isSaving ||
        editRecordDataSource.isError
      ) {
        <Data {...this.props} />
      } else {
        `NOT IMPLEMENTED: ${editRecordDataSource.status}`
      }
    }
  }
}

FormData.propTypes = {
  editRecordDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  model: PropTypes.object,
  counter: PropTypes.number.isRequired,
  saveText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
}

export default FormData
