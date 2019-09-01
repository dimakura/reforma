import React from 'react'
import { shallow } from 'enzyme'
import Toolbar from '../Toolbar'

describe('<Toolbar />', () => {
  test('default toolbar', () => {
    const comp = shallow(<Toolbar>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('style')).toEqual({
      padding: 4
    })
  })

  test('with top margin', () => {
    const comp = shallow(<Toolbar topMargin>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('style')).toEqual({
      padding: 4,
      marginTop: 16
    })
  })

  test('with bottom margin', () => {
    const comp = shallow(<Toolbar bottomMargin>content</Toolbar>)

    expect(comp.text()).toBe('content')
    expect(comp.prop('style')).toEqual({
      padding: 4,
      marginBottom: 16
    })
  })
})
