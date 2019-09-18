import Reforma from '@reforma/core'
import React from 'react'
import { mount } from 'enzyme'
import Table from '../index'

describe('<Table />', () => {
  test('normal scenario', async () => {
    mockHttp()
    const ds = createDataSource()
    const params = { _page: 1, _limit: 10 }
    const table = createComponent(ds, params)

    expect(table.find('Placeholder').prop('children')).toBe('Loading...')
    expect(Reforma.http.get).toHaveBeenCalledWith(
      '/presidents',
      expect.objectContaining({ params })
    )
    await new Promise(resolve => setTimeout(resolve, 0))
    table.update()
    expect(table.find('Data').text()).toBe([1, 'John', 'Quincy Adams'].join(''))
  })

  test('empty data', async () => {
    mockHttp([])
    const ds = createDataSource()
    const table = createComponent(ds, {})
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(table.find('Placeholder').text()).toBe('No data')
  })
})

const defaultBody = {
  presidents: [{
    id: '1',
    first_name: 'John',
    last_name: 'Quincy Adams'
  }]
}

function mockHttp(resp = defaultBody) {
  Reforma.http.get = jest.fn(() => ({
    ok: true,
    json: () => resp,
    headers: { 'X-Total-Count': 10 }
  }))
}

function createDataSource() {
  const type = Reforma.createType({
    name: 'President',
    fields: {
      id: Reforma.integer.id,
      firstName: Reforma.string,
      lastName: Reforma.string
    }
  })

  return Reforma.createCollectionDS({
    type,
    serialRoot: 'presidents',
    url: '/presidents'
  })
}

function createComponent(ds, params) {
  return mount(
    <Table
      params={params}
      dataSource={ds}
      columns={['id', 'firstName', 'lastName']}
    />
  )
}
