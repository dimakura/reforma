import buildUrl from '../buildUrl'

test('buildUrl', () => {
  expect(buildUrl('/profiles', null)).toBe('/profiles')
  expect(buildUrl('/profiles', { page: 1, perPage: 10 })).toBe('/profiles?page=1&per_page=10')
})
