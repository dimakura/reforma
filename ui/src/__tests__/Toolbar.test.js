import React from 'react'
import { shallow } from 'enzyme'
import Toolbar from '../Toolbar'

describe('<Toolbar />', () => {
  test('default toolbar', () => {
    const comp = shallow(<Toolbar>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('style')).toEqual({
      padding: 6
    })
  })

  test('with top margin', () => {
    const comp = shallow(<Toolbar topMargin>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('style')).toEqual({
      padding: 6,
      marginTop: 11
    })
  })

  test('with bottom margin', () => {
    const comp = shallow(<Toolbar bottomMargin>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('style')).toEqual({
      padding: 6,
      marginBottom: 11
    })
  })
})
