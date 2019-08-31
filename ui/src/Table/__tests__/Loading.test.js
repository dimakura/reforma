import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../Loading'

test('<Loading />', () => {
  const comp = shallow(
    <Loading columns={['col1', 'col2']} />
  )

  expect(comp.is('tr')).toBe(true)
  const cell = comp.childAt(0)
  expect(cell.is('td')).toBe(true)
  expect(cell.text()).toBe('Loading...')
  expect(cell.prop('colSpan')).toBe(2)
})
