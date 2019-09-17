import Reforma from '@reforma/core'
import React from 'react'
import { shallow } from 'enzyme'
import CollectionComponent from '../CollectionComponent'

test('<CollectionComponent />', async () => {
  mockHttp()
  const ds = createDataSource()
  const initialParams = { _page: 1, _limit: 10 }
  const comp = createComponent(ds, initialParams)

  expect(comp.text()).toBe('Status: busy')
  expect(Reforma.http.get).toHaveBeenCalledWith(
    '/presidents',
    expect.objectContaining({ params: initialParams })
  )

  await new Promise(resolve => setTimeout(resolve, 0))
  expect(comp.text()).toBe('Status: ready')
})

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
    url: '/presidents'
  })
}

function mockHttp() {
  Reforma.http.get = jest.fn(() => ({
    ok: true,
    json: () => ({
      presidents: [{
        id: '1',
        first_name: 'John',
        last_name: 'Quincy Adams'
      }]
    }),
    headers: { 'X-Total-Count': 10 }
  }))
}

function createComponent(ds, initialParams) {
  return shallow(
    <CollectionComponent
      autofetch
      initialParams={initialParams}
      dataSource={ds}
      render={() => {
        return (
          <div>
            Status: {ds.status}
          </div>
        )
      }}
    />
  )
}