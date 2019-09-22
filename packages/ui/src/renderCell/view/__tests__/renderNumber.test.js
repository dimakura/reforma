import { shallow } from 'enzyme'
import renderValue from '../renderValue'

test('renderNumber', () => {
  testNumberRendering(10.12345, 'number', '10')
  testNumberRendering(10.12345, 'number:1', '10.1')
  testNumberRendering(10.12345, 'number:2', '10.12')
  testNumberRendering(10.12345, 'number:3', '10.123')
  testNumberRendering(10.12345, 'number:4', '10.1235')
  testNumberRendering(10.12345, 'number:5', '10.12345')
  testNumberRendering(10.12345, 'number:6', '10.123450')
})

function testNumberRendering(value, hints, expectedRepresentation) {
  const comp = shallow(renderValue(value, hints))

  expect(comp.name()).toBe('code')
  expect(comp.prop('className')).toBe('rf-number')
  expect(comp.text()).toBe(expectedRepresentation)
}
