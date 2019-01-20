import React from 'react'
import PropTypes from 'prop-types'
import { default as MUITable} from '@material-ui/core/Table'
import { EVENT_PARAMS_CHANGED, EVENT_STATUS_CHANGED } from 'reforma/datasource/TableDataSource'
import TableHeader from './TableHeader'
import TableData from './TableData'
import Pagination from './Pagination'

class Table extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 1
    }
  }

  componentDidMount() {
    this.addListeners()
    this.initialLoad()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  render() {
    const { columns, perPage, tableDataSource } = this.props
    const status = tableDataSource.status

    return (
      <div>
        <MUITable>
          <TableHeader columns={columns} />
          <TableData
            tableDataSource={tableDataSource}
            columns={columns}
            status={status}
          />
        </MUITable>
        {
          do {
            if (perPage != null) {
              <Pagination
                perPage={perPage}
                tableDataSource={tableDataSource}
                onChange={this.onChangePage.bind(this)}
                status={status}
              />
            }
          }
        }
      </div>
    )
  }

  addListeners() {
    const { tableDataSource } = this.props
    const shakeView = () => {
      this.setState({
        counter: this.state.counter + 1
      })
    }

    this.removeParamsListener = tableDataSource.subscribe(EVENT_PARAMS_CHANGED, shakeView)
    this.removeStatusListener = tableDataSource.subscribe(EVENT_STATUS_CHANGED, shakeView)
  }

  removeListeners() {
    this.removeParamsListener()
    this.removeStatusListener()
  }

  initialLoad() {
    const {
      perPage,
      tableDataSource
    } = this.props

    if (tableDataSource.isInitial) {
      const initialParams = do {
        if (perPage != null) {
          ({ page: 1, perPage })
        } else {
          ({})
        }
      }

      this.fetchData(initialParams)
    } else if (!tableDataSource.isInProgress) {
      // TODO: try to reload with the same params
    }
  }

  fetchData(params) {
    this.props.tableDataSource.fetch(params)
  }

  onChangePage(newPage) {
    const { tableDataSource } = this.props
    const params = tableDataSource.params

    this.fetchData({
      ...params,
      page: newPage
    })
  }
}

Table.propTypes = {
  schema: PropTypes.object.isRequired,
  tableDataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  withSearchBar: PropTypes.bool,
  perPage: PropTypes.number,
  hasPaging: PropTypes.bool
}

export default Table