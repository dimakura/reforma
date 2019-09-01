import React from 'react'
import PropTypes from 'prop-types'
import Theme from './Theme'

const toolbarPadding = Theme.paddingUnit
const toolbarMargin = Theme.marginUnit * 4

class Toolbar extends React.PureComponent {
  render() {
    const style = {
      padding: toolbarPadding
    }

    if (this.props.topMargin) {
      style.marginTop = toolbarMargin
    }

    if (this.props.bottomMargin) {
      style.marginBottom = toolbarMargin
    }

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

Toolbar.defaultProps = {
  topMargin: false,
  bottomMargin: false
}

Toolbar.propTypes = {
  topMargin: PropTypes.bool.isRequired,
  bottomMargin: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Toolbar
