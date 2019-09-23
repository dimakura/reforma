import React from 'react'
import PropTypes from 'prop-types'
import { HTMLTable } from '@blueprintjs/core'
import CollectionComponent from '../CollectionComponent'
import normalizeCellSpec from '../renderCell/normalizeCellSpec'
import Header from './Header'
import Placeholder from './Placeholder'
import Data from './Data'

class Table extends React.PureComponent {
  render() {
    const {
      autofetch,
      cached,
      dataSource,
      params,
      header,
      columns,
      condensed,
      interactive,
      style
    } = this.props

    const cols = columns.map(normalizeCellSpec)

    return (
      <CollectionComponent
        autofetch={autofetch}
        cached={cached}
        dataSource={dataSource}
        params={params}
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
              className="rf-table"
            >
              {
                do {
                  if (header) {
                    <Header columns={cols} />
                  }
                }
              }
              <tbody>
                {
                  do {
                    if (isInitialLoad) {
                      <Placeholder columns={cols}>
                        Loading...
                      </Placeholder>
                    } else if (!hasData) {
                      <Placeholder columns={cols}>
                        No data
                      </Placeholder>
                    } else {
                      <Data
                        data={data}
                        columns={cols}
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
  params: PropTypes.object,
  header: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  condensed: PropTypes.bool.isRequired,
  interactive: PropTypes.bool.isRequired,
  style: PropTypes.object
}

export default Table
