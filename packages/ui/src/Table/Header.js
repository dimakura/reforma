import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <thead>
        <tr>
          {columns.map((col, idx) => {
            const style = styleFor(col)

            return (
              <th key={idx} style={style}>
                {col.label}
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

// -- PRIVATE

function styleFor(col) {
  return do {
    if ('width' in col) {
      ({ width: col.width })
    }
  }
}
