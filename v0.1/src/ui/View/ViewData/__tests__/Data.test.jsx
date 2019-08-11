import React from 'react'
import { mount } from 'enzyme'
import TableCell from '@material-ui/core/TableCell'
import { getViewProps } from 'Test/factories'
import Data from '../Data'

describe('<Data />', () => {
  test('rendering', () => {
    const viewProps = getViewProps()

    const data = {
      id: 1,
      firstName: 'Dimitri',
      lastName: 'Kurashvili'
    }

    const viewUI = mount(
      <Data
        columns={viewProps.columns}
        model={data}
      />
    )

    const cells = viewUI.find(TableCell).children()

    expect(cells).toHaveLength(4)
    expect(cells.at(0)).toIncludeText('First Name')
    expect(cells.at(1)).toIncludeText('Dimitri')
    expect(cells.at(2)).toIncludeText('Last Name')
    expect(cells.at(3)).toIncludeText('Kurashvili')
  })
})
