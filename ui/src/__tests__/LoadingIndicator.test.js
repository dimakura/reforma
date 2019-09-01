import React from 'react'
import { shallow } from 'enzyme'
import { Spinner } from '@blueprintjs/core'
import CollectionComponent from '../CollectionComponent'
import LoadingIndicator from '../LoadingIndicator'

describe('<LoadingIndicator />', () => {
  test('fetching dataSource', () => {
    const dataSource = {
      status: 'fetching'
    }

    const comp = shallow(<LoadingIndicator dataSource={dataSource} />)
    const spinner = comp.renderProp('render')()

    expect(comp.is(CollectionComponent)).toBe(true)
    expect(spinner.is(Spinner)).toBe(true)
    expect(spinner.prop('size')).toBe(16)
  })

  test('ready dataSource', () => {
    const dataSource = {
      status: 'ready'
    }
    const comp = shallow(<LoadingIndicator dataSource={dataSource} />)
    const spinner = comp.renderProp('render')()

    expect(comp.is(CollectionComponent)).toBe(true)
    expect(spinner.type()).toBeNull()
  })
})
