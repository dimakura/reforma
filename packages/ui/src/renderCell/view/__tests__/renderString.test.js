import { shallow } from 'enzyme'
import renderValue from '../renderValue'

describe('renderString', () => {
  test('string value', () => {
    const comp = shallow(renderValue('Tony Canzoneri', 'string'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-string')
    expect(comp.text()).toBe('Tony Canzoneri')
  })

  test('non-string value', () => {
    const value = new Date()
    const comp = shallow(renderValue(value, 'string'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-string')
    expect(comp.text()).toBe(value.toString())
  })
})
