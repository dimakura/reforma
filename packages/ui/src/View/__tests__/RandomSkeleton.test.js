import React from 'react'
import { shallow } from 'enzyme'
import RandomSkeleton from '../RandomSkeleton'

test('<RandomSkeleton />', () => {
  const comp = shallow(<RandomSkeleton />)
  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('bp3-skeleton')
  expect(comp.text()).toMatch('xxx')
})
