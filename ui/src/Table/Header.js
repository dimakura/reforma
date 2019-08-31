import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'

function styleFor(col) {
  return do {
    if (typeof col === 'object' && 'width' in col) {
      ({
        width: col.width
      })
    }
  }
}

function headerFor(col) {
  return do {
    if (typeof col === 'string') {
      startCase(col)
    } else if ('header' in col) {
      col.header
    } else {
      startCase(col.name)
    }
  }
}

class Header extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <thead>
        <tr>
          {columns.map((col, idx) => {
            const style = styleFor(col)
            const header = headerFor(col)

            return (
              <th key={idx} style={style}>
                {header}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
}

Header.propTypes = {
  columns: PropTypes.array.isRequired
}

export default Header
