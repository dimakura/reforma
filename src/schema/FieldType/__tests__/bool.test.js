import React from 'react'
import { shallow } from 'enzyme'
import formatBool from '../bool'

describe('formatBool', () => {
  function render(value) {
    const comp = shallow(formatBool(value))
    const props = comp.props()
    expect(comp.is('Checkbox')).toBe(true)
    expect(props.disabled).toBe(true)

    return props
  }

  test('true', () => {
    const props = render(true)
    expect(props.checked).toBe(true)
  })

  test('false', () => {
    const props = render(false)
    expect(props.checked).toBeUndefined()
  })

  test('indeterminate', () => {
    const props = render('xxx')
    expect(props.indeterminate).toBe(true)
    expect(props.checked).toBeUndefined()
  })
})
