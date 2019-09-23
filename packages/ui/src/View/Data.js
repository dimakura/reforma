import React from 'react'
import PropTypes from 'prop-types'
import normalizeCellSpec from '../renderCell/normalizeCellSpec'
import renderViewCell from '../renderCell/view'
import CellSkeleton from '../CellSkeleton'

class Data extends React.PureComponent {
  render() {
    const { fields, data, skeleton, labelWidth } = this.props

    return fields.map((fld, i) => {
      fld = normalizeCellSpec(fld)

      return (
        <tr key={i}>
          <td width={labelWidth} className="rf-label">{fld.label}</td>
          <td style={fld.style} className={fld.className}>
            {
              do {
                if (data == null || skeleton) {
                  <CellSkeleton />
                } else {
                  renderViewCell(fld, data)
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
