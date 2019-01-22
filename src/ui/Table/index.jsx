import React from 'react'
import PropTypes from 'prop-types'
import createTableProps from './TableProps'
import Table from './Table'

class TableRoot extends React.PureComponent {
  render() {
    const {
      schema,
      columns,
      perPage
    } = this.props

    const tableProps = createTableProps({
      schema,
      columns,
      perPage
    })

    return <Table {...tableProps} />
  }
}

TableRoot.propTypes = {
  schema: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  perPage: PropTypes.number
}

export default TableRoot
