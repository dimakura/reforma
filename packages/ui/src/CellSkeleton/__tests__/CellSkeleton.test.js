import React from 'react'
import { shallow } from 'enzyme'
import CellSkeleton from '../index'

test('<CellSkeleton />', () => {
  const comp = shallow(<CellSkeleton />)
  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('bp3-skeleton')
  expect(comp.text()).toMatch('xxx')
})
