import React from 'react'
import PropTypes from 'prop-types'

class Toolbar extends React.PureComponent {
  render() {
    const classNames = ['rf-toolbar']

    if (this.props.topMargin) {
      classNames.push('rf-top-margin')
    }

    if (this.props.bottomMargin) {
      classNames.push('rf-bottom-margin')
    }

    return (
      <div className={classNames.join(' ')}>
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
