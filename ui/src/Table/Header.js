import React from 'react'
import { startCase } from 'lodash'

class Header extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <thead>
        <tr>
          {columns.map((col, idx) => {
            return do {
              if (typeof col === 'string') {
                <th key={idx}>
                  {startCase(col)}
                </th>
              } else {
                const header = col.header || col.name
                const style = {}

                if ('width' in col) {
                  style.width = col.width
                }

                <th key={idx} style={style}>
                  {startCase(header)}
                </th>
              }
            }
          })}
        </tr>
      </thead>
    )
  }
}

export default Header
