import React from 'react'
import PropTypes from 'prop-types'
import { HTMLTable } from '@blueprintjs/core'
import DataSourceComponent from '../DataSourceComponent'
import Header from './Header'
import Placeholder from './Placeholder'
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
      condensed,
      interactive,
      style
    } = this.props

    return (
      <DataSourceComponent
        autofetch={autofetch}
        cached={cached}
        dataSource={dataSource}
        initialParams={initialParams}
        render={() => {
          const data = dataSource.data
          const status = dataSource.status
          const hasData = data != null && data.length > 0
          const isInitialLoad = status === 'initial' || (status === 'busy' && !hasData)

          return (
            <HTMLTable
              bordered
              condensed={condensed}
              interactive={hasData && interactive}
              style={style}
              className="rt-table"
            >
              {
                do {
                  if (header) {
                    <Header columns={columns} />
                  }
                }
              }
              <tbody>
                {
                  do {
                    if (isInitialLoad) {
                      <Placeholder columns={columns}>
                        Loading...
                      </Placeholder>
                    } else if (!hasData) {
                      <Placeholder columns={columns}>
                        No data
                      </Placeholder>
                    } else {
                      <Data
                        data={data}
                        columns={columns}
                      />
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
  condensed: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
  style: PropTypes.object
}

export default Table
