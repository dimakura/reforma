import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import { HTMLTable } from '@blueprintjs/core'
import CollectionComponent from '../CollectionComponent'
import Header from './Header'
import Loading from './Loading'
import Data from './Data'

class Table extends React.PureComponent {
  render() {
    const {
      autofetch,
      cached,
      dataSource,
      initialParams,
      header,
      columns,
      bordered,
      condensed,
      interactive,
      style
    } = this.props

    return (
      <CollectionComponent
        autofetch={autofetch}
        cached={cached}
        dataSource={dataSource}
        initialParams={initialParams}
        render={() => {
          const status = dataSource.status
          const hasData = dataSource.data != null && dataSource.data.length > 0

          return (
            <HTMLTable
              bordered={bordered}
              condensed={condensed}
              interactive={hasData && interactive}
              style={style}
            >
              <Header columns={columns} />
              <tbody>
                {
                  do {
                    if (status === 'initial' || (status === 'fetching' && !hasData)) {
                      <Loading cols={columns.length} />
                    } else if (status === 'failed') {
                      // TODO: error indicator? toast?
                      <Data columns={columns} dataSource={dataSource} />
                    } else {
                      <Data columns={columns} dataSource={dataSource} />
                    }
                  }
                }
              </tbody>
            </HTMLTable>
          )
        }}
      />
    )
  }
}

Table.defaultProps = {
  autofetch: true,
  cached: true,
  header: true,
  bordered: true,
  condensed: true,
  interactive: true
}

Table.propTypes = {
  autofetch: PropTypes.bool.isRequired,
  cached: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  initialParams: PropTypes.object,
  header: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  bordered: PropTypes.bool.isRequired,
  condensed: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
  style: PropTypes.object
}

export default Table
