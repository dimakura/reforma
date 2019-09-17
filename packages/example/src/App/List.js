import React from 'react'
import {
  Error,
  LoadingIndicator,
  Pagination,
  RefreshAction,
  Table,
  Toolbar
} from '@reforma/ui'
import { Link } from 'react-router-dom'
import presidentsDS from './presidentsDS'

const initialParams = { _page: 1, _limit: 5 }
const id = { name: 'id', header: 'N', width: 50, style: { textAlign: 'right' } }
const fullName = {
  header: 'Full Name',
  render: (model) => (
    <Link to={`/presidents/${model.id}`}>{model.fullName}</Link>
  )
}

class List extends React.PureComponent {
  render() {
    return (
      <div style={{ padding: 16 }}>
        <Toolbar bottomMargin>
          <RefreshAction dataSource={presidentsDS} />
        </Toolbar>
        <Error dataSource={presidentsDS} bottomMargin />
        <Table
          dataSource={presidentsDS}
          columns={[id, fullName]}
          style={{ width: '100%' }}
          initialParams={initialParams}
        />
        <Toolbar topMargin>
          <Pagination dataSource={presidentsDS} />
          <LoadingIndicator dataSource={presidentsDS} />
        </Toolbar>
      </div>
    )
  }
}

export default List
