import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'

test('<Header />', () => {
  const id = { header: 'id', width: 50 }
  const firstName = 'firstName'
  const lastName = { name: 'lastName' }
  const columns = [id, firstName, lastName]
  const comp = shallow(<Header columns={columns} />)
  const headers = comp.find('th')

  expect(comp.is('thead')).toBe(true)
  expect(headers).toHaveLength(3)
  expect(headers.at(0).text()).toBe('id')
  expect(headers.at(0).prop('style')).toMatchObject({ width: 50 })
  expect(headers.at(1).text()).toBe('First Name')
  expect(headers.at(2).text()).toBe('Last Name')
})
