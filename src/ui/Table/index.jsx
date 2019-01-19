import React from 'react'
import PropTypes from 'prop-types'
import createTableProps from './TableProps'
import Table from './Table'

class TableRoot extends React.PureComponent {
  render() {
    const {
      schema,
      columns,
      perPage,
      withSearchBar
    } = this.props

    const props = createTableProps({
      schema,
      columns,
      perPage,
      withSearchBar
    })

    return <Table tableProps={props} />
  }
}

TableRoot.propTypes = {
  schema: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  withSearchBar: PropTypes.bool
}

export default TableRoot
