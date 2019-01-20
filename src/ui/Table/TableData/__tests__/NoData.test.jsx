import React from 'react'
import { mount } from 'enzyme'
import { default as MUITable} from '@material-ui/core/Table'
import { tableProps } from './helpers'
import TableCell from '@material-ui/core/TableCell'
import NoData from '../NoData'

describe('<NoData />', () => {
  test('rendering', () => {
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
