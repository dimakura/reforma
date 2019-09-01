import React from 'react'
import PropTypes from 'prop-types'

class Placeholder extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <tr>
        <td
          colSpan={columns.length}
          className="rf-placeholder"
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
