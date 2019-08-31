import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../Loading'

test('<Loading />', () => {
  const comp = shallow(
    <Loading columns={['col1', 'col2']} />
  )

  expect(comp.is('tr')).toBe(true)
  expect(comp.childAt(0).is('td')).toBe(true)
  expect(comp.childAt(0).text()).toBe('Loading...')
  expect(comp.childAt(0).prop('colSpan')).toBe(2)
})
