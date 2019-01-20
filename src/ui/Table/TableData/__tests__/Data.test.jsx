import React from 'react'
import { mount } from 'enzyme'
import { default as MUITable} from '@material-ui/core/Table'
import { tableProps } from './helpers'
import TableCell from '@material-ui/core/TableCell'
import Data from '../Data'

describe('<Data />', () => {
  test('rendering', () => {
    const data = [{
      id: 1,
      firstName: 'Dimitri',
      lastName: 'Kurashvili'
    }, {
      id: 2,
      firstName: 'Misho',
      lastName: 'Kurashvili'
    }]

    const dataUI = mount(
      <MUITable>
        <Data
          columns={tableProps.columns}
          data={data}
        />
      </MUITable>
    )

    const cells = dataUI.find(TableCell).children()

    expect(cells).toHaveLength(4)
    expect(cells.at(0)).toIncludeText('Dimitri')
    expect(cells.at(1)).toIncludeText('Kurashvili')
    expect(cells.at(2)).toIncludeText('Misho')
    expect(cells.at(3)).toIncludeText('Kurashvili')
  })
})
