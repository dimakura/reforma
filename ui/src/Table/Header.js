import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import Theme from '../Theme'

const border = `1px solid ${Theme.borderColor}`
const invisibleShadow = 'inset 0 0 0 0 #0000'

function styleFor(col, idx) {
  const style = {
    border,
    boxShadow: invisibleShadow
  }

  if (idx > 0) {
    style.borderLeft = null
  }

  if (typeof col === 'object' && 'width' in col) {
    style.width = col.width
  }

  return style
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
            const style = styleFor(col, idx)
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
