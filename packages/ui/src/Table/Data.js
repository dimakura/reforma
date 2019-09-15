import React from 'react'
import PropTypes from 'prop-types'
import isPresent from '../utils/isPresent'

function renderCell(col, model, idx) {
  const value = do {
    if (typeof col === 'string') {
      model[col]
    } else if ('render' in col) {
      col.render(model)
    } else if ('name' in col) {
      model[col.name]
    }
  }

  const props = {
    key: idx,
    style: col.style,
    className: col.className
  }

  return (
    <td {...props}>
      {
        do {
          if (isPresent(value)) {
            value
          } else {
            <span className="bp3-text-muted">
              (empty)
            </span>
          }
        }
      }
    </td>
  )
}

class Data extends React.PureComponent {
  render() {
    const { columns, data } = this.props

    return data.map((item, i) => {
      return (
        <tr key={i}>
          {columns.map((col, j) => renderCell(col, item, j))}
        </tr>
      )
    })
  }
}

Data.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}

export default Data
