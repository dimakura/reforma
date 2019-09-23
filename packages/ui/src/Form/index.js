import React from 'react'
import PropTypes from 'prop-types'
import { HTMLTable } from '@blueprintjs/core'
import { isEqual } from 'lodash'
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
            <form onSubmit={this.onSubmit.bind(this)}>
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
                    fields={fields}
                    skeleton={!isNew && !sameRecord}
                    isNew={isNew}
                    labelWidth={labelWidth}
                  />
                </tbody>
              </HTMLTable>
            </form>
          )
        }}
      />
    )
  }

  onSubmit() {
    console.log('submitting...')
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
