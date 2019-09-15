import React from 'react'
import { shallow } from 'enzyme'
import renderEmpty from '../renderEmpty'

test('renderEmpty', () => {
  const comp = shallow(renderEmpty())

  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('bp3-text-muted')
  expect(comp.text()).toBe('(empty)')
})
