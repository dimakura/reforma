import React from 'react'
import PropTypes from 'prop-types'
import renderView from '../renderCell/view'

function renderCell(col, model, idx) {
  return (
    <td key={idx} style={col.style} className={col.className}>
      {renderView(col, model)}
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
