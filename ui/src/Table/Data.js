import React from 'react'
import PropTypes from 'prop-types'
import Placeholder from './Placeholder'

function renderCell(col, item, key) {
  const value = do {
    if (typeof col === 'string') {
      item[col]
    } else if ('render' in col) {
      col.render(item)
    } else if ('name' in col) {
      item[col.name]
    }
  }

  const style = do {
    if (col.align != null) {
      ({
        textAlign: col.align
      })
    }
  }

  return do {
    if (value != null) {
      <td key={key} style={style}>
        {value}
      </td>
    } else {
      <td key={key}>
        <span className="bp3-text-muted">
          (empty)
        </span>
      </td>
    }
  }
}

class Data extends React.PureComponent {
  render() {
    const { columns, dataSource } = this.props
    const data = dataSource.data

    return do {
      if (data != null && data.length > 0) {
        data.map((item, i) => {
          return (
            <tr key={i}>
              {columns.map((col, j) => renderCell(col, item, j))}
            </tr>
          )
        })
      } else {
        <Placeholder columns={columns}>
          No data
        </Placeholder>
      }
    }
  }
}

Data.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.object.isRequired
}

export default Data
