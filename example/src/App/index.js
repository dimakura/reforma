import React from 'react'
import {
  LoadingIndicator,
  Pagination,
  RefreshAction,
  Table,
  Toolbar
} from '@reforma/ui'
import presidentsDS from './presidentsDS'

const initialParams = { _page: 1, _limit: 3 }
const id = { name: 'id', header: 'N', width: 50, cellStyle: { textAlign: 'right' } }
const firstName = 'firstName'
const lastName = 'lastName'

class App extends React.PureComponent {
  render() {
    return (
      <div style={{ padding: 16 }}>
        <Toolbar>
          <RefreshAction dataSource={presidentsDS} />
        </Toolbar>
        <Table
          dataSource={presidentsDS}
          columns={[id, firstName, lastName]}
          style={{ width: '100%' }}
          initialParams={initialParams}
        />
        <Toolbar>
          <Pagination dataSource={presidentsDS} />
          <LoadingIndicator dataSource={presidentsDS} />
        </Toolbar>
      </div>
    )
  }
}

export default App
