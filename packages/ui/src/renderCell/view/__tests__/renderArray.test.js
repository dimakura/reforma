import { shallow } from 'enzyme'
import renderValue from '../renderValue'

test('renderArray', () => {
  const comp = shallow(renderValue([1, 2], 'array:number:2'))

  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('rf-array')
  expect(comp.childAt(0).name()).toBe('span')
  expect(comp.childAt(0).prop('className')).toBe('rf-array-element')
  expect(comp.childAt(0).text()).toBe('1.00')
  expect(comp.childAt(1).name()).toBe('span')
  expect(comp.childAt(1).prop('className')).toBe('rf-array-element')
  expect(comp.childAt(1).text()).toBe('2.00')
})
