import React from 'react'
import PropTypes from 'prop-types'
import { Callout } from '@blueprintjs/core'
import CollectionComponent from './CollectionComponent'

class Error extends React.PureComponent {
  render() {
    const { dataSource, topMargin, bottomMargin } = this.props

    const classNames = do {
      const classes = ['rf-error']
      if (topMargin) {
        classes.push('rf-top-margin')
      }
      if (bottomMargin) {
        classes.push('rf-bottom-margin')
      }
      classes.join(' ')
    }

    return (
      <CollectionComponent
        autofetch={false}
        cached={true}
        dataSource={dataSource}
        render={() => {
          const error = dataSource.error

          return do {
            if (error != null && dataSource.status === 'failed') {
              <Callout intent="danger" className={classNames}>
                {
                  do {
                    if (error.__isException__) {
                      error.exception.message
                    } else if (error.__isBadResponse__) {
                      `${error.status}: ${error.statusText}`
                    } else {
                      error
                    }
                  }
                }
              </Callout>
            } else {
              null
            }
          }
        }}
      />
    )
  }
}

Error.defaultProps = {
  topMargin: false,
  bottomMargin: false
}

Error.propTypes = {
  dataSource: PropTypes.object.isRequired,
  topMargin: PropTypes.bool.isRequired,
  bottomMargin: PropTypes.bool.isRequired
}

export default Error
