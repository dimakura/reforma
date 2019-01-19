import React from 'react'
import PropTypes from 'prop-types'
import createTableProps from './TableProps'

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

    return (
      <div>
        This is table!
      </div>
    )
  }
}

TableRoot.propTypes = {
  schema: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  withSearchBar: PropTypes.bool
}

export default TableRoot
