import Reforma from '@reforma/core'

function mock() {
  Reforma.http.get = jest.fn(() => ({
    ok: true,
    json: () => ({
      profiles: [{
        id: 1,
        first_name: 'Benjamin',
        last_name: 'Graham'
      }, {
        id: 2,
        first_name: 'Warren',
        last_name: 'Buffett'
      }, {
        id: 3,
        first_name: 'Peter',
        last_name: 'Lynch'
      }]
    }),
    headers: { 'X-Total-Count': 10 }
  }))
}

function expectCall(params) {
  expect(Reforma.http.get).toHaveBeenCalledWith(
    '/profiles',
    expect.objectContaining({
      params: params
    })
  )
}

function expectTimes(times) {
  expect(Reforma.http.get).toHaveBeenCalledTimes(times)
}

export const collectionRequest = {
  mock,
  expectCall,
  expectTimes
}
