import defaultPageMover from '../defaultPageMover'

test('defaultPageMover', () => {
  const ds = {
    params: {
      _page: 1,
      _limit: 10
    },
    fetch: jest.fn()
  }

  defaultPageMover(ds, 2)

  expect(ds.fetch).toHaveBeenCalledWith({
    _page: 2,
    _limit: 10
  })
})
