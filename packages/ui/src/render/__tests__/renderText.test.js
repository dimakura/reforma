import { shallow } from 'enzyme'
import renderText from '../renderText'

describe('renderText', () => {
  test('string value', () => {
    const comp = shallow(renderText('Sugar Ray Robinson'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-text')
    expect(comp.text()).toBe('Sugar Ray Robinson')
  })

  test('non-string value', () => {
    const value = 1
    const comp = shallow(renderText(value))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-text')
    expect(comp.text()).toBe('1')
  })
})
