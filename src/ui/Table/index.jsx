import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import createTableProps from './TableProps'
import Table from './Table'

class TableRoot extends React.PureComponent {
  render() {
    const data = pick(this.props, [
      'schema',
      'columns',
      'perPage'
    ])

    const tableProps = createTableProps(data)

    return <Table {...tableProps} />
  }
}

TableRoot.propTypes = {
  schema: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  perPage: PropTypes.number
}

export default TableRoot
