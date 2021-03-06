import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import createTableProps from './TableProps'
import Table from './Table'

class TableRoot extends React.PureComponent {
  render() {
    const data = pick(this.props, [
      'schema',
      'tableDataSource',
      'columns',
      'perPage',
      'showHeader',
      'showFooter',
      'fetchParams'
    ])

    const tableProps = createTableProps(data)

    return <Table {...tableProps} />
  }
}

TableRoot.propTypes = {
  schema: PropTypes.object,
  tableDataSource: PropTypes.object,
  columns: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  showFooter: PropTypes.bool,
  showHeader: PropTypes.bool,
  fetchParams: PropTypes.object
}

export default TableRoot
