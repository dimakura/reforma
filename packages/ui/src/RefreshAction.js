import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'
import DataSourceComponent from './DataSourceComponent'

function isBusy(dataSource) {
  return dataSource.status === 'busy'
}

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

    return (
      <DataSourceComponent
        autofetch={false}
        cached={true}
        dataSource={dataSource}
        render={() => {
          const busy = isBusy(dataSource)

          return (
            <Button
              disabled={busy}
              intent={intent}
              text={text}
              icon={icon}
              large={large}
              small={small}
              minimal={minimal}
              onClick={() => {
                if (!busy) {
                  dataSource.refetch()
                }
              }}
            />
          )
        }}
      />
    )
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
