import React from 'react'
import { shallow } from 'enzyme'
import renderTag from '../renderTag'

test('renderTag', () => {
  const comp = shallow(renderTag('sale', ['primary']))

  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('rf-tag bp3-tag bp3-minimal bp3-intent-primary')
  expect(comp.text()).toBe('sale')
})
