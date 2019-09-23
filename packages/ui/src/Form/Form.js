import React from 'react'
import PropTypes from 'prop-types'
import { Button, HTMLTable } from '@blueprintjs/core'
import Toolbar from '../Toolbar'
import Data from './Data'

class Form extends React.PureComponent {
  render() {
    const {
      fields,
      condensed,
      interactive,
      isLoading,
      style,
      labelWidth,
      isNew,
      data
    } = this.props

    return (
      <form onSubmit={this.onSubmit.bind(this, data)}>
        <HTMLTable
          bordered
          condensed={condensed}
          interactive={!isLoading && interactive}
          style={style}
          className="rf-form"
        >
          <tbody>
            <Data
              data={data}
              fields={fields}
              skeleton={isLoading}
              isNew={isNew}
              labelWidth={labelWidth}
            />
            <tr>
              <td className="rf-label">&nbsp;</td>
              <td>
                <Toolbar>
                  <Button
                    intent="primary"
                    type="submit"
                    text="Submit"
                  />
                  <Button
                    text="Cancel"
                  />
                </Toolbar>
              </td>
            </tr>
          </tbody>
        </HTMLTable>
      </form>
    )
  }

  async onSubmit(model, evt) {
    evt.preventDefault()

    const { id, isNew, fields, dataSource } = this.props
    const fieldNames = getFieldNames(fields)

    // TODO: validations
    // console.log(model.getErrors())

    if (isNew) {
      await dataSource.create(model, fieldNames)
    } else {
      await dataSource.update(id, model, fieldNames)
    }

    // 1. check dataSource status
    // 2. display errors if needed
    // 3. process onComplete if no errors
  }
}

Form.propTypes = {
  id: PropTypes.any,
  dataSource: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  condensed: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  style: PropTypes.object,
  labelWidth: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
  data: PropTypes.object
}

export default Form

// -- PRIVATE

function getFieldNames(fields) {
  return fields.filter(f => f.readOnly !== true).map(f => f.name)
}
