import { shallow } from 'enzyme'
import renderValue from '../renderValue'

describe('renderText', () => {
  test('string value', () => {
    const comp = shallow(renderValue('Sugar Ray Robinson', 'text'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-text')
    expect(comp.text()).toBe('Sugar Ray Robinson')
  })

  test('non-string value', () => {
    const value = 1
    const comp = shallow(renderValue(value, 'text'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-text')
    expect(comp.text()).toBe('1')
  })
})
