import React from 'react'
import PropTypes from 'prop-types'
import labelForField from '../utils/labelForField'
import renderView from '../renderCell/view'
import CellSkeleton from '../CellSkeleton'

class Data extends React.PureComponent {
  render() {
    const { fields, data, skeleton, labelWidth } = this.props

    return fields.map((fld, i) => {
      return (
        <tr key={i}>
          <td width={labelWidth} className="rf-label">
            {labelForField(fld)}
          </td>
          <td style={fld.style} className={fld.className}>
            {
              do {
                if (data == null || skeleton) {
                  <CellSkeleton />
                } else if (fld.readOnly) {
                  renderView(fld, data)
                } else {
                  'TODO: render editor'
                }
              }
            }
          </td>
        </tr>
      )
    })
  }
}

Data.propTypes = {
  data: PropTypes.object,
  fields: PropTypes.array.isRequired,
  skeleton: PropTypes.bool.isRequired,
  labelWidth: PropTypes.number.isRequired
}

export default Data
