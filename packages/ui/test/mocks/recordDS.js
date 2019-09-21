import Reforma from '@reforma/core'

function mock() {
  Reforma.http.get = jest.fn(() => ({
    ok: true,
    json: () => ({
      profile: {
        id: 1,
        first_name: 'Benjamin',
        last_name: 'Graham'
      }
    }),
    headers: { 'X-Expires-In': '30 days' }
  }))
}

function expectCall(id) {
  expect(Reforma.http.get).toHaveBeenCalledWith(
    `/profiles/:id`,
    expect.objectContaining({
      params: {
        id: [id]
      }
    })
  )
}

function expectTimes(times) {
  expect(Reforma.http.get).toHaveBeenCalledTimes(times)
}

export const recordRequest = {
  mock,
  expectCall,
  expectTimes
}
