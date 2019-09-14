import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '@blueprintjs/core'
import CollectionComponent from '../CollectionComponent'
import RefreshAction from '../RefreshAction'

describe('<RefreshAction />', () => {
  let dataSource

  beforeEach(() => {
    dataSource = {
      status: 'ready',
      fetch: jest.fn(),
      refetch: jest.fn()
    }
  })

  describe('dataSource interactions', () => {
    test('ready dataSource', () => {
      const comp = shallow(<RefreshAction dataSource={dataSource} />)
      const button = comp.renderProp('render')()

      expect(dataSource.fetch).not.toHaveBeenCalled()
      expect(dataSource.refetch).not.toHaveBeenCalled()

      expect(comp.is(CollectionComponent)).toBe(true)
      expect(button.is(Button)).toBe(true)
      expect(button.prop('disabled')).toBe(false)

      button.simulate('click')
      expect(dataSource.refetch).toHaveBeenCalled()
    })

    test('busy dataSource', () => {
      const dataSource = {
        status: 'fetching',
        fetch: jest.fn(),
        refetch: jest.fn()
      }
      const comp = shallow(<RefreshAction dataSource={dataSource} />)
      const button = comp.renderProp('render')()

      expect(dataSource.fetch).not.toHaveBeenCalled()
      expect(dataSource.refetch).not.toHaveBeenCalled()

      expect(comp.is(CollectionComponent)).toBe(true)
      expect(button.is(Button)).toBe(true)
      expect(button.prop('disabled')).toBe(true)

      button.simulate('click')
      expect(dataSource.refetch).not.toHaveBeenCalled()
    })
  })

  describe('props', () => {
    test('default properties', () => {
      const comp = shallow(<RefreshAction dataSource={dataSource} />)
      const button = comp.renderProp('render')()

      expect(button.prop('text')).toBe('Refresh')
      expect(button.prop('icon')).toBe('refresh')
      expect(button.prop('intent')).toBeUndefined()
      expect(button.prop('large')).toBe(false)
      expect(button.prop('small')).toBe(false)
      expect(button.prop('minimal')).toBe(false)
    })

    test('modified properties', () => {
      const comp = shallow(
        <RefreshAction
          dataSource={dataSource}
          text="Refresh Data"
          icon="server"
          intent="primary"
          large
          small
          minimal
        />
      )
      const button = comp.renderProp('render')()

      expect(button.prop('text')).toBe('Refresh Data')
      expect(button.prop('icon')).toBe('server')
      expect(button.prop('intent')).toBe('primary')
      expect(button.prop('large')).toBe(true)
      expect(button.prop('small')).toBe(true)
      expect(button.prop('minimal')).toBe(true)
    })
  })
})
