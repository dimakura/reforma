import buildUrl from '../buildUrl'

test('buildUrl', () => {
  expect(buildUrl('/profiles', null)).toBe('/profiles')
  expect(buildUrl('/profiles', { page: 1, query: 'Dimitri' })).toBe('/profiles?page=1&query=Dimitri')
})
