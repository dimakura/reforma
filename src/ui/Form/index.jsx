import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import createFormProps from './FormProps'
import Form from './Form'

class FormRoot extends React.PureComponent {
  render() {
    const data = pick(this.props, [
      'schema',
      'columns',
      'record',
      'id',
      'saveText',
      'cancelText',
      'onSuccess',
      'onCancel'
    ])

    const formProps = createFormProps(data)

    return <Form {...formProps} />
  }
}

FormRoot.propTypes = {
  schema: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  saveText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
}

FormRoot.defaultProps = {
  saveText: 'Save',
  cancelText: 'Cancel'
}

export default FormRoot
