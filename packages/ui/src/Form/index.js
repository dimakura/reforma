import React from 'react'
import PropTypes from 'prop-types'
import { Button, HTMLTable } from '@blueprintjs/core'
import { isEqual } from 'lodash'
import normalizeCellSpec from '../renderCell/normalizeCellSpec'
import RecordComponent from '../RecordComponent'
import Data from './Data'

class Form extends React.PureComponent {
  render() {
    const {
      id,
      autofetch,
      cached,
      dataSource,
      defaults,
      fields,
      condensed,
      interactive,
      style,
      labelWidth
    } = this.props
    const normalizedId = dataSource.normalizeId(id)
    const isNew = normalizedId == null
    const flds = fields.map(normalizeCellSpec)

    return (
      <RecordComponent
        autofetch={autofetch}
        cached={cached}
        dataSource={dataSource}
        id={normalizedId}
        render={() => {
          const data = do {
            if (isNew) {
              dataSource.type.create(defaults)
            } else {
              dataSource.type.create(dataSource.data)
            }
          }

          const sameRecord = do {
            if (data == null) {
              false
            } else {
              isEqual(normalizedId, data.getId())
            }
          }

          return (
            <form onSubmit={this.onSubmit.bind(this, data)}>
              <HTMLTable
                bordered
                condensed={condensed}
                interactive={sameRecord && interactive}
                style={style}
                className="rf-form"
              >
                <tbody>
                  <Data
                    data={data}
                    fields={flds}
                    skeleton={!isNew && !sameRecord}
                    isNew={isNew}
                    labelWidth={labelWidth}
                  />
                  <tr>
                    <td className="rf-label">&nbsp;</td>
                    <td>
                      <Button
                        intent="primary"
                        type="submit"
                        text="Submit"
                      />
                    </td>
                  </tr>
                </tbody>
              </HTMLTable>
            </form>
          )
        }}
      />
    )
  }

  onSubmit(model, evt) {
    evt.preventDefault()

    const { id, fields, dataSource } = this.props
    const fieldNames = getFieldNames(fields)
    // const data = extractData(model, fieldNames)

    // TODO: validations
    // console.log(model.__type__.getError())

    const normalizedId = dataSource.normalizeId(id)
    const isNew = normalizedId == null

    if (isNew) {
      dataSource.create(model, fieldNames)
    } else {
      dataSource.update(id, model, fieldNames)
    }
  }
}

Form.defaultProps = {
  autofetch: true,
  cached: true,
  condensed: true,
  interactive: true,
  labelWidth: 140
}

Form.propTypes = {
  id: PropTypes.any,
  autofetch: PropTypes.bool.isRequired,
  cached: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  defaults: PropTypes.object,
  condensed: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
  style: PropTypes.object,
  labelWidth: PropTypes.number.isRequired
}

export default Form

// -- PRIVATE

function getFieldNames(fields) {
  return fields.map(normalizeCellSpec)
    .filter(f => f.readOnly !== true)
    .map(f => f.name)
}

function extractData(model, fieldNames) {
  const data = {}
  for (let i = 0; i < fieldNames.length; i++) {
    const name = fieldNames[i]
    data[name] = model[name]
  }

  return data
}
