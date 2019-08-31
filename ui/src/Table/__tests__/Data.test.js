import React from 'react'
import { shallow } from 'enzyme'
import Data from '../Data'

describe('<Data />', () => {
  const data = [
    { id: 1, firstName: 'Charles', lastName: 'Lyell' },
    { id: 2, firstName: 'James', lastName: 'Hutton' },
    { id: 3, firstName: '', lastName: '' }
  ]
  const id = { name: 'id', header: 'id', align: 'right' }
  const firstName = 'firstName'
  const lastName = { name: 'lastName', render: (profile) => `${profile.firstName} ${profile.lastName}` }
  const columns = [id, firstName, lastName]

  test('no data', () => {
    const comp = shallow(<Data columns={columns} data={null} />)
    const placeholder = comp.childAt(0)
    expect(placeholder.text()).toBe('No data')
  })

  test('with data', () => {
    const comp = shallow(<Data columns={columns} data={data} />)
    const cells = comp.find('td')
    expect(cells).toHaveLength(9)
    expect(cells.at(0).text()).toBe('1')
    expect(cells.at(0).prop('style')).toEqual({ textAlign: 'right' })
    expect(cells.at(1).text()).toBe('Charles')
    expect(cells.at(2).text()).toBe('Charles Lyell')
    expect(cells.at(3).text()).toBe('2')
    expect(cells.at(4).text()).toBe('James')
    expect(cells.at(5).text()).toBe('James Hutton')
    expect(cells.at(6).text()).toBe('3')
    expect(cells.at(7).text()).toBe('(empty)')
    expect(cells.at(8).text()).toBe('(empty)')
  })
})
