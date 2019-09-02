import React from 'react'
import PropTypes from 'prop-types'
import isPresent from '../utils/isPresent'

function renderCell(col, item, idx) {
  const value = do {
    if (typeof col === 'string') {
      item[col]
    } else if ('render' in col) {
      col.render(item)
    } else if ('name' in col) {
      item[col.name]
    }
  }

  return do {
    if (isPresent(value)) {
      <td key={idx} style={col.cellStyle}>
        {value}
      </td>
    } else {
      <td key={idx} style={col.cellStyle}>
        <span className="bp3-text-muted">
          (empty)
        </span>
      </td>
    }
  }
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
