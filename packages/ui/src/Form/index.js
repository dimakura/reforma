import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import normalizeCellSpec from '../renderCell/normalizeCellSpec'
import RecordComponent from '../RecordComponent'
import Form from './Form'

class EditorForm extends React.PureComponent {
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
    const normalizedFields = fields.map(normalizeCellSpec)

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

          // while loading record
          const isLoading = do {
            if (data == null) {
              true
            } else if (isNew) {
              false
            } else {
              !isEqual(normalizedId, data.getId())
            }
          }

          return (
            <Form
              id={normalizedId}
              dataSource={dataSource}
              fields={normalizedFields}
              condensed={condensed}
              interactive={interactive}
              isLoading={isLoading}
              style={style}
              labelWidth={labelWidth}
              isNew={isNew}
              data={data}
            />
          )
        }}
      />
    )
  }
}

EditorForm.defaultProps = {
  autofetch: true,
  cached: true,
  condensed: true,
  interactive: true,
  labelWidth: 140
}

EditorForm.propTypes = {
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

export default EditorForm
