import { shallow } from 'enzyme'
import renderValue from '../renderValue'

test('renderDate', () => {
  const date = new Date(2019, 8, 15, 18, 9, 33)

  testDateRendering(date, 'date', '09/15/2019 18:09')
  testDateRendering(date, 'date:long', '09/15/2019 18:09:33')
  testDateRendering(date, 'date:short', '09/15/2019')
})

function testDateRendering(value, hints, expectedRepresentation) {
  const comp = shallow(renderValue(value, hints))

  expect(comp.name()).toBe('span')
  expect(comp.prop('className')).toBe('rf-date')
  expect(comp.text()).toBe(expectedRepresentation)
}
