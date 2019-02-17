import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Editor from 'reforma/ui/Editor'

class FormData extends React.PureComponent {
  render() {
    const {
      columns,
      model,
      onChange,
      editRecordDataSource,
      saveText,
      cancelText,
      classes,
      onCancel
    } = this.props

    const isSubmitting = editRecordDataSource.isSaving

    const errors = do {
      if (editRecordDataSource.isError) {
        get(editRecordDataSource, 'errors.errors')
      } else {
        ({})
      }
    }

    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
        className={classes.root}
      >
        {columns.map(colum => {
          const field = colum.field
          const value = field.getValue(model)
          const error = get(errors, field.name, get(errors, field.submitName))

          return (
            <Editor
              key={field.name}
              column={colum}
              value={value}
              error={error}
              onChange={onChange}
            />
          )
        })}
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            disabled={isSubmitting}
          >
            {saveText}
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            disabled={isSubmitting}
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        </div>
      </form>
    )
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }
}

FormData.propTypes = {
  editRecordDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  saveText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  button: {
    marginRight: 8
  }
}

export default withStyles(styles)(FormData)
