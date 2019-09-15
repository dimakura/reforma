import { shallow } from 'enzyme'
import renderValue from '../renderValue'

describe('renderBool', () => {
  test('true', () => {
    const comp = shallow(renderValue(true, 'bool'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-bool')
    expect(comp.text()).toBe('Yes')
  })

  test('false', () => {
    const comp = shallow(renderValue(false, 'bool'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-bool')
    expect(comp.text()).toBe('No')
  })

  test('non default specification', () => {
    const comp = shallow(renderValue(true, 'bool:Of course:No f***** way!'))

    expect(comp.name()).toBe('span')
    expect(comp.prop('className')).toBe('rf-bool')
    expect(comp.text()).toBe('Of course')
  })
})
