import React from 'react'
import { mount } from 'enzyme'
import { default as MUITable} from '@material-ui/core/Table'
import { tableProps } from './helpers'
import TableCell from '@material-ui/core/TableCell'
import Loading from '../Loading'

describe('<Loading />', () => {
  test('rendering', () => {
    const loading = mount(
      <MUITable>
        <Loading columns={tableProps.columns} />
      </MUITable>
    )

    const cells = loading.find(TableCell).children()
    expect(cells).toHaveLength(1)
    expect(cells.at(0)).toIncludeText('Loading data...')
  })
})
