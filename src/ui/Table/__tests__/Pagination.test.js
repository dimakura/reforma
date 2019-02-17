import React from 'react'
import { mount } from 'enzyme'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { getAsync } from 'reforma/api'
import { getTableProps } from 'Test/factories'
import Pagination from '../Pagination'

describe('<Pagination />', () => {
  test('when no data', () => {
    const tableProps = getTableProps()
    const pagination = mount(
      <Pagination
        tableDataSource={tableProps.tableDataSource}
        perPage={10}
        onChange={jest.fn()}
      />
    )

    expect(pagination.find('div').exists()).toBe(false)
  })

  test('when data is loaded', async () => {
    getAsync.mockResolvedValue({
      isSuccess: true,
      data: {
        data: [{
          id: 1,
          firstName: 'Dimitri',
          lastName: 'Kurashvili'
        }],
        total: 100
      }
    })

    const tableProps = getTableProps()
    await tableProps.tableDataSource.fetch({
      page: 1,
      perPage: 10
    })

    const onChange = jest.fn()
    const pagination = mount(
      <Pagination
        tableDataSource={tableProps.tableDataSource}
        perPage={10}
        onChange={onChange}
      />
    )

    const pages = pagination.find(Typography)
    const buttons = pagination.find(IconButton)
    const firstBtn = buttons.at(0)
    const prevBtn = buttons.at(1)
    const nextBtn = buttons.at(2)
    const lastBtn = buttons.at(3)
    nextBtn.simulate('click')

    expect(pagination.find('div').exists()).toBe(true)
    expect(pages).toIncludeText('Page 1 / 10')
    expect(buttons).toHaveLength(4)
    expect(firstBtn.prop('disabled')).toBe(true)
    expect(prevBtn.prop('disabled')).toBe(true)
    expect(nextBtn.prop('disabled')).toBe(false)
    expect(lastBtn.prop('disabled')).toBe(false)
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
