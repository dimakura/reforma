import React from 'react'
import { mount } from 'enzyme'
import Table from '../Table'

describe('<Table />', () => {
  test('rendering', () => {
    const table = mount(
      <Table />
    )

    expect(table).toIncludeText('TODO: table')
  })
})
