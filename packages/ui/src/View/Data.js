import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import render from '../render'
import RandomSkeleton from './RandomSkeleton'

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

    return fields.map((fld, i) => {
      return (
        <tr key={i}>
          <td width={labelWidth} className="rf-label">
            {labelFor(fld)}
          </td>
          <td style={fld.style} className={fld.className}>
            {
              do {
                if (data == null || skeleton) {
                  <RandomSkeleton />
                } else {
                  render(fld, data)
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
