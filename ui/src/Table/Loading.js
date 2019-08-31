import React from 'react'

class Loading extends React.PureComponent {
  render() {
    return (
      <tr>
        <td
          colSpan={this.props.cols}
          style={{ padding: 16 }}
        >
          Loading...
        </td>
      </tr>
    )
  }
}

export default Loading
