import React from 'react'
import { mount } from 'enzyme'
import { default as MUITable} from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import { getTableProps } from 'Test/factories'
import NoData from '../NoData'

describe('<NoData />', () => {
  test('rendering', () => {
    const tableProps = getTableProps()
    const nodata = mount(
      <MUITable>
        <NoData columns={tableProps.columns} />
      </MUITable>
    )

    const cells = nodata.find(TableCell).children()
    expect(cells).toHaveLength(1)
    expect(cells.at(0)).toIncludeText('No data')
  })
})
