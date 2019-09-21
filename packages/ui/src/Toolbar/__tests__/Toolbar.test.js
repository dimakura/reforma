import React from 'react'
import { shallow } from 'enzyme'
import Toolbar from '../index'

describe('<Toolbar />', () => {
  test('default toolbar', () => {
    const comp = shallow(<Toolbar>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('className')).toBe('rf-toolbar')
  })

  test('with top margin', () => {
    const comp = shallow(<Toolbar topMargin>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('className')).toBe('rf-toolbar rf-top-margin')
  })

  test('with bottom margin', () => {
    const comp = shallow(<Toolbar bottomMargin>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('className')).toBe('rf-toolbar rf-bottom-margin')
  })
})
