import React from 'react'
import PropTypes from 'prop-types'
import { snakeCase, forEach } from 'lodash'
import { EVENT_STATUS_CHANGED } from 'reforma/datasource/EditRecordDataSource'
import FormComponents from './FormData'

class Form extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 1,
      model: null
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
    const { model, counter } = this.state

    return (
      <div>
        <FormComponents
          model={model}
          onChange={this.onChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          counter={counter}
          {...this.props}
        />
      </div>
    )
  }

  shakeView() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  addListeners() {
    const { editRecordDataSource, onSuccess } = this.props

    const assignModelWhenReadyAndShakeView = (newStatus) => {
      if (
        newStatus === 'ready' &&
        this.state.model == null
      ) {
        // initial model
        this.setState({
          model: editRecordDataSource.model
        })
      } else if (
        newStatus === 'success' &&
        typeof onSuccess === 'function'
      ) {
        onSuccess(editRecordDataSource.model)
      }

      this.shakeView()
    }

    this.removeStatusListener = editRecordDataSource.subscribe(
      EVENT_STATUS_CHANGED,
      assignModelWhenReadyAndShakeView
    )
  }

  removeListeners() {
    this.removeStatusListener()
  }

  initialLoad() {
    this.props.editRecordDataSource.fetchRecord()
  }

  onChange(field, value) {
    const { model } = this.state
    field.setValue(model, value)

    this.shakeView()
  }

  onSubmit() {
    const { data, columns, editRecordDataSource } = this.props
    const { model } = this.state
    const formData = new FormData()

    forEach(data, (value, key) => {
      key = snakeCase(key)
      formData.append(key, value)
    })

    for (let i = 0; i < columns.length; i++) {
      const field = columns[i].field
      const fieldName = snakeCase(field.submitName)
      const fieldValue = field.getSubmitValue(model)
      formData.append(fieldName, fieldValue)
    }

    editRecordDataSource.save(formData)
    // onSuccess handler will be called in status listener
  }
}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  editRecordDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  saveText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancl: PropTypes.func
}

export default Form
