import React from 'react'
import { mount } from 'enzyme'
import { merge } from 'lodash'
import { Button } from '@blueprintjs/core'
import Pagination from '../index'

describe('<Pagination />', () => {
  const dataSource = {
    addStatusListener: () => () => {}
  }

  test('at the first page', () => {
    const pageExtractor = getPageExtractor()
    const pageMover = getPageMover()

    const comp = mount(<Pagination
      dataSource={dataSource}
      pageExtractor={pageExtractor}
      pageMover={pageMover}
    />)

    const buttons = comp.find(Button)
    expect(buttons).toHaveLength(4)
    expect(buttons.at(0).prop('disabled')).toBe(true)
    expect(buttons.at(1).prop('disabled')).toBe(true)
    expect(buttons.at(2).prop('disabled')).toBe(false)
    expect(buttons.at(3).prop('disabled')).toBe(false)

    expect(comp.find('div.rf-pages').text()).toBe('Page 1 of 10')

    buttons.at(2).simulate('click')
    buttons.at(3).simulate('click')
    expect(pageMover).toHaveBeenCalledWith(dataSource, 10)
  })

  test('at a middle page', () => {
    const pageExtractor = getPageExtractor({ page: 5 })
    const pageMover = getPageMover()

    const comp = mount(<Pagination
      dataSource={dataSource}
      pageExtractor={pageExtractor}
      pageMover={pageMover}
    />)

    const buttons = comp.find(Button)
    expect(buttons).toHaveLength(4)
    expect(buttons.at(0).prop('disabled')).toBe(false)
    expect(buttons.at(1).prop('disabled')).toBe(false)
    expect(buttons.at(2).prop('disabled')).toBe(false)
    expect(buttons.at(3).prop('disabled')).toBe(false)

    expect(comp.find('div.rf-pages').text()).toBe('Page 5 of 10')

    buttons.at(0).simulate('click')
    buttons.at(1).simulate('click')
    buttons.at(2).simulate('click')
    buttons.at(3).simulate('click')
    expect(pageMover).toHaveBeenCalledWith(dataSource, 4)
    expect(pageMover).toHaveBeenCalledWith(dataSource, 1)
    expect(pageMover).toHaveBeenCalledWith(dataSource, 6)
    expect(pageMover).toHaveBeenCalledWith(dataSource, 10)
  })

  test('at the last page', () => {
    const pageExtractor = getPageExtractor({ page: 10 })
    const pageMover = getPageMover()

    const comp = mount(<Pagination
      dataSource={dataSource}
      pageExtractor={pageExtractor}
      pageMover={pageMover}
    />)

    const buttons = comp.find(Button)
    expect(buttons).toHaveLength(4)
    expect(buttons.at(0).prop('disabled')).toBe(false)
    expect(buttons.at(1).prop('disabled')).toBe(false)
    expect(buttons.at(2).prop('disabled')).toBe(true)
    expect(buttons.at(3).prop('disabled')).toBe(true)

    expect(comp.find('div.rf-pages').text()).toBe('Page 10 of 10')

    buttons.at(0).simulate('click')
    buttons.at(1).simulate('click')
    expect(pageMover).toHaveBeenCalledWith(dataSource, 9)
    expect(pageMover).toHaveBeenCalledWith(dataSource, 1)
  })
})

const defaultPages = {
  limit: 10,
  total: 100,
  page: 1,
  pages: 10
}

function getPageExtractor(pages) {
  return jest.fn(() => merge({}, defaultPages, pages))
}

function getPageMover() {
  return jest.fn()
}
