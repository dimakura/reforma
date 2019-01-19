import React from 'react'
import { mount } from 'enzyme'
import { default as MUITable} from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHeader from '../TableHeader'
import { tableProps } from './helpers'

describe('<TableHeader />', () => {
  test('rendering', () => {
    const header = mount(
      <MUITable>
        <TableHeader tableProps={tableProps} />
      </MUITable>
    )

    expect(header.find(TableCell).children()).toHaveLength(2)
    expect(header).toIncludeText('First Name')
    expect(header).toIncludeText('@Last-Name@')
  })
})
