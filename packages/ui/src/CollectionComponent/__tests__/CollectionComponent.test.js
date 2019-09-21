import React from 'react'
import { shallow } from 'enzyme'
import { merge } from 'lodash'
import { createCollectionDS } from 'Test/factories'
import { collectionRequest } from 'Test/mocks'
import CollectionComponent from '../index'

describe('<CollectionComponent />', () => {
  const params = { _page: 1, _limit: 3 }
  let ds

  beforeEach(() => {
    ds = createCollectionDS()
  })

  test('with autofetch', async () => {
    collectionRequest.mock()
    const comp1 = createComponent(ds, { params: params })

    expect(comp1.text()).toBe('Status: busy')
    await delay()
    expect(comp1.text()).toBe('Status: ready')
    collectionRequest.expectCall(params)
    collectionRequest.expectTimes(1)
    jest.clearAllMocks()

    const comp2 = createComponent(ds)
    expect(comp2.text()).toBe('Status: ready')
    collectionRequest.expectTimes(0)

    ds.refetch()
    expect(comp1.text()).toBe('Status: busy')
    expect(comp2.text()).toBe('Status: busy')
    await delay()
    expect(comp1.text()).toBe('Status: ready')
    expect(comp2.text()).toBe('Status: ready')
    collectionRequest.expectCall(params)
    collectionRequest.expectTimes(1)
  })

  test('without autofetch', async () => {
    collectionRequest.mock()
    const comp = createComponent(ds, {
      autofetch: false,
      params: params
    })

    // component doesn't send any request
    expect(comp.text()).toBe('Status: initial')
    collectionRequest.expectTimes(0)

    // fetching data manually
    ds.fetch(params)
    expect(comp.text()).toBe('Status: busy')
    await delay()
    expect(comp.text()).toBe('Status: ready')
    collectionRequest.expectTimes(1)
    collectionRequest.expectCall(params)
  })

  test('with autofetch but without caching', async () => {
    collectionRequest.mock()
    const comp1 = createComponent(ds, { params: params })

    expect(comp1.text()).toBe('Status: busy')
    await delay()
    expect(comp1.text()).toBe('Status: ready')
    collectionRequest.expectCall(params)
    collectionRequest.expectTimes(1)
    jest.clearAllMocks()

    const comp2 = createComponent(ds, {
      params: params,
      cached: false
    })

    expect(comp1.text()).toBe('Status: busy')
    expect(comp2.text()).toBe('Status: busy')
    await delay()
    expect(comp1.text()).toBe('Status: ready')
    expect(comp2.text()).toBe('Status: ready')
    collectionRequest.expectCall(params)
    collectionRequest.expectTimes(1)
  })
})

function createComponent(ds, opts) {
  const props = merge({
    autofetch: true,
    cached: true,
    params: {},
    dataSource: ds,
    render: () => (<div>Status: {ds.status}</div>)
  }, opts)

  return shallow(<CollectionComponent {...props} />)
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 0))
}
