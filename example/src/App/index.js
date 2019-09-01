import React from 'react'
import { Table } from '@reforma/ui'
import presidentsDS from './presidentsDS'

const initialParams = { _page: 1, _limit: 5 }
const id = { name: 'id', header: 'N', width: 50, align: 'right' }
const firstName = 'firstName'
const lastName = 'lastName'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Table
          dataSource={presidentsDS}
          columns={[id, firstName, lastName]}
          style={{ width: '100%' }}
          initialParams={initialParams}
        />
      </div>
    )
  }
}

export default App
