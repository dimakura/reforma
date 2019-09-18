import React from 'react'
import Reforma from '@reforma/core'
import { shallow } from 'enzyme'
import Data from '../Data'
import RandomSkeleton from '../RandomSkeleton'

describe('<View.Data />', () => {
  let type

  beforeEach(() => {
    type = Reforma.createType({
      name: 'Profile',
      fields: {
        firstName: Reforma.string,
        lastName: Reforma.string
      }
    })
  })

  test('displays data', () => {
    const data = type.create({
      first_name: 'Warren',
      last_name: 'Buffett'
    })

    const comp = shallow(
      <Data
        skeleton={false}
        data={data}
        fields={['firstName', 'lastName']}
        labelWidth={100}
      />
    )

    const cells = comp.find('td')
    expect(cells).toHaveLength(4)
    expect(cells.at(0).text()).toBe('First Name')
    expect(cells.at(1).text()).toBe('Warren')
    expect(cells.at(2).text()).toBe('Last Name')
    expect(cells.at(3).text()).toBe('Buffett')
  })

  test('display skeleton (on waiting)', () => {
    const comp = shallow(
      <Data
        skeleton={true}
        fields={['firstName', 'lastName']}
        labelWidth={100}
      />
    )

    const cells = comp.find('td')
    expect(cells).toHaveLength(4)
    expect(cells.at(0).text()).toBe('First Name')
    expect(cells.at(1).exists(RandomSkeleton)).toBe(true)
    expect(cells.at(2).text()).toBe('Last Name')
    expect(cells.at(3).exists(RandomSkeleton)).toBe(true)
  })
})
