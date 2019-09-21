import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'
import CollectionComponent from '../CollectionComponent'
import RecordComponent from '../RecordComponent'

class RefreshAction extends React.PureComponent {
  render() {
    const {
      dataSource,
      intent,
      text,
      icon,
      large,
      small,
      minimal
    } = this.props
    const isBusy = dataSource.status === 'busy'
    const props = {
      autofetch: false,
      cached: true,
      dataSource: dataSource,
      render: () => {
        return (
          <Button
            disabled={isBusy}
            intent={intent}
            text={text}
            icon={icon}
            large={large}
            small={small}
            minimal={minimal}
            onClick={() => {
              if (!isBusy) {
                dataSource.refetch()
              }
            }}
          />
        )
      }
    }

    return do {
      if (dataSource.__isCollectionDS__) {
        <CollectionComponent {...props} />
      } else {
        <RecordComponent {...props} />
      }
    }
  }
}

RefreshAction.defaultProps = {
  text: 'Refresh',
  icon: 'refresh',
  large: false,
  small: false,
  minimal: false
}

RefreshAction.propTypes = {
  dataSource: PropTypes.object.isRequired,
  intent: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  large: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  minimal: PropTypes.bool.isRequired
}

export default RefreshAction
