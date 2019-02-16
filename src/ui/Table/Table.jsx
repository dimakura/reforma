import React from 'react'
import PropTypes from 'prop-types'
import { default as MUITable} from '@material-ui/core/Table'
import { EVENT_PARAMS_CHANGED, EVENT_STATUS_CHANGED } from 'reforma/datasource/TableDataSource'
import TableHeader from './TableHeader'
import TableData from './TableData'
import Toolbar from './Toolbar'
import Pagination from '../Pagination'
import Total from './Total'

class Table extends React.PureComponent {
  constructor(props) {
    super(props)

    // this is a dummy counter to shake the tree
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
        <Toolbar>
          <Total total={tableDataSource.total} />

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
        </Toolbar>
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
      this.fetchData(tableDataSource.params)
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
  perPage: PropTypes.number
}

export default Table
