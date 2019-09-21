import React from 'react'
import { shallow } from 'enzyme'
import { merge } from 'lodash'
import { createRecordDS } from 'Test/factories'
import { recordRequest } from 'Test/mocks'
import RecordComponent from '../index'

describe('<RecordComponent />', () => {
  let ds

  beforeEach(() => {
    ds = createRecordDS()
  })

  test('with autofetch', async () => {
    recordRequest.mock()
    const comp1 = createComponent(ds, { id: 1 })

    expect(comp1.text()).toBe('Status: busy')
    await delay()
    expect(comp1.text()).toBe('Status: ready')
    recordRequest.expectCall(1)
    recordRequest.expectTimes(1)
    jest.clearAllMocks()

    // same ID used in cached component
    const comp2 = createComponent(ds, { id: 1 })
    expect(comp2.text()).toBe('Status: ready')
    recordRequest.expectTimes(0)

    // same ID used in not-cached component
    const comp3 = createComponent(ds, { id: 1, cached: false })
    expect(comp3.text()).toBe('Status: busy')
    await delay()
    expect(comp3.text()).toBe('Status: ready')
    recordRequest.expectCall(1)
    recordRequest.expectTimes(1)
    jest.clearAllMocks()

    // new ID used in cached component
    const comp4 = createComponent(ds, { id: 2 })
    expect(comp4.text()).toBe('Status: busy')
    await delay()
    expect(comp4.text()).toBe('Status: ready')
    recordRequest.expectCall(2)
    recordRequest.expectTimes(1)
    jest.clearAllMocks()
  })

  test('without autofetch', async () => {
    recordRequest.mock()
    const comp = createComponent(ds, { id: 1, autofetch: false })

    expect(comp.text()).toBe('Status: initial')
    recordRequest.expectTimes(0)

    // fetching data manually
    ds.fetch(2)
    expect(comp.text()).toBe('Status: busy')
    await delay()
    expect(comp.text()).toBe('Status: ready')
    recordRequest.expectTimes(1)
    recordRequest.expectCall(2)
  })
})

function createComponent(ds, opts) {
  const props = merge({
    autofetch: true,
    cached: true,
    dataSource: ds,
    render: () => (<div>Status: {ds.status}</div>)
  }, opts)

  return shallow(<RecordComponent {...props} />)
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 0))
}
