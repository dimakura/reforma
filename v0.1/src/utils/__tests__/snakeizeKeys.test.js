import snakeizeKeys from '../snakeizeKeys'

test('snakeizeKeys', () => {
  expect(snakeizeKeys({
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
  })).toEqual({
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
  })
})
