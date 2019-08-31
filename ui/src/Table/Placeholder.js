import React from 'react'
import PropTypes from 'prop-types'

class Placeholder extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <tr>
        <td
          colSpan={columns.length}
          style={{ padding: 16 }}
        >
          {this.props.children}
        </td>
      </tr>
    )
  }
}

Placeholder.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.array.isRequired
}

export default Placeholder
