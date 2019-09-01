import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../Theme'

const placeholderPadding = Theme.paddingTimes(4)
const border = `1px solid ${Theme.borderColor}`
const invisibleShadow = 'inset 0 0 0 0 #0000'

class Placeholder extends React.PureComponent {
  render() {
    const { columns } = this.props

    const style = {
      padding: placeholderPadding,
      boxShadow: invisibleShadow,
      borderLeft: border,
      borderRight: border,
      borderBottom: border
    }

    return (
      <tr>
        <td
          colSpan={columns.length}
          style={style}
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
