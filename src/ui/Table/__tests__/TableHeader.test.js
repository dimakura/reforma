import React from 'react'
import { mount } from 'enzyme'
import { default as MUITable} from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import { getTableProps } from './helpers'
import TableHeader from '../TableHeader'

describe('<TableHeader />', () => {
  test('rendering', () => {
    const tableProps = getTableProps()
    const header = mount(
      <MUITable>
        <TableHeader columns={tableProps.columns} />
      </MUITable>
    )

    expect(header.find(TableCell).children()).toHaveLength(2)
    expect(header).toIncludeText('First Name')
    expect(header).toIncludeText('@Last-Name@')
  })
})
