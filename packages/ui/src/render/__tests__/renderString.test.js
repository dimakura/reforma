import React from 'react'
import { shallow } from 'enzyme'
import renderString from '../renderString'

describe('renderString', () => {
  test('string value', () => {
    const comp = shallow(renderString('Tony Canzoneri'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-string')
    expect(comp.text()).toBe('Tony Canzoneri')
  })

  test('non-string value', () => {
    const value = new Date()
    const comp = shallow(renderString(value))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-string')
    expect(comp.text()).toBe(value.toString())
  })
})
