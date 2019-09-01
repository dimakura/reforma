import React from 'react'
import { shallow } from 'enzyme'
import Placeholder from '../Placeholder'

test('<Placeholder />', () => {
  const comp = shallow(
    <Placeholder columns={['col1', 'col2']}>
      Loading...
    </Placeholder>
  )

  expect(comp.is('tr')).toBe(true)
  const cell = comp.childAt(0)
  expect(cell.is('td')).toBe(true)
  expect(cell.text()).toBe('Loading...')
  expect(cell.prop('colSpan')).toBe(2)
})
