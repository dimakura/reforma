import camelizeKeys from '../camelizeKeys'

test('camelizeKeys', () => {
  expect(camelizeKeys({
    first_name: 'Dimirti',
    last_name: 'Kurashvili',
    travels: {
      from_point: 'A',
      to_point: 'B'
    },
    experience: [{
      company_name: 'SiApp',
      since: 2018
    }]
  })).toEqual({
    firstName: 'Dimirti',
    lastName: 'Kurashvili',
    travels: {
      fromPoint: 'A',
      toPoint: 'B'
    },
    experience: [{
      companyName: 'SiApp',
      since: 2018
    }]
  })
})
