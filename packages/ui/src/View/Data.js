import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import render from '../render'
import RandomSkeleton from './RandomSkeleton'

function renderCell(fld, model, skeleton) {
  return (
    <td style={fld.style} className={fld.className}>
      {
        do {
          if (model == null || skeleton) {
            <RandomSkeleton />
          } else {
            render(fld, model)
          }
        }
      }
    </td>
  )
}

function labelFor(fld) {
  return do {
    if (typeof fld === 'string') {
      startCase(fld)
    } else if ('label' in fld) {
      fld.label
    } else {
      startCase(fld.name)
    }
  }
}

class Data extends React.PureComponent {
  render() {
    const { fields, data, skeleton, labelWidth } = this.props

    return fields.map((field, i) => {
      return (
        <tr key={i}>
          <td width={labelWidth} className="rf-label">
            {labelFor(field)}
          </td>
          {renderCell(field, data, skeleton)}
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
