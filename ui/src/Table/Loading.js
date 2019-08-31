import React from 'react'
import PropTypes from 'prop-types'

class Loading extends React.PureComponent {
  render() {
    const { columns } = this.props

    return (
      <tr>
        <td
          colSpan={columns.length}
          style={{ padding: 16 }}
        >
          Loading...
        </td>
      </tr>
    )
  }
}

Loading.propTypes = {
  columns: PropTypes.array.isRequired
}

export default Loading
