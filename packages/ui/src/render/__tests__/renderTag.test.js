import { shallow } from 'enzyme'
import renderValue from '../renderValue'

test('renderTag', () => {
  const comp = shallow(renderValue('sale', 'tag:primary'))

  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('rf-tag bp3-tag bp3-minimal bp3-intent-primary')
  expect(comp.text()).toBe('sale')
})
