import pageExtractor from '../defaultPageExtractor'

const emptyDS = {}

const expectedDS = {
  params: { _limit: 10, _page: 1 },
  headers: { get: () => 100 }
}

const limitOnlyDS = {
  params: { _limit: 10 }
}

const totalOnlyDS = {
  params: { _page: 2 },
  headers: { get: () => 100 }
}

test('defaultPageExtractor', () => {
  expect(pageExtractor(expectedDS)).toEqual({ limit: 10, total: 100, page: 1, pages: 10 })
  expect(pageExtractor(emptyDS)).toEqual({ limit: null, total: null, page: null, pages: null })
  expect(pageExtractor(limitOnlyDS)).toEqual({ limit: 10, total: null, page: null, pages: null })
  expect(pageExtractor(totalOnlyDS)).toEqual({ limit: null, total: 100, page: 2, pages: null })
})
