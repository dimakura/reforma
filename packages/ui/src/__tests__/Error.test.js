import React from 'react'
import { mount } from 'enzyme'
import { Callout } from '@blueprintjs/core'
import Error from '../Error'

describe('<Error />', () => {
  test('displays error', () => {
    const error = getError()
    const dataSource = getDataSource(error)
    const comp = mount(<Error dataSource={dataSource} />)
    expect(comp.find(Callout).text()).toMatch('Failed to load')
  })

  test('no error', () => {
    const dataSource = getDataSource()
    const comp = mount(<Error dataSource={dataSource} />)
    expect(comp.find(Callout)).toHaveLength(0)
  })
})

function getDataSource(error) {
  return {
    status: 'failed',
    error,
    addStatusListener: () => () => {}
  }
}

function getError() {
  return {
    __isException__: true,
    exception: {
      message: 'Failed to load'
    }
  }
}
