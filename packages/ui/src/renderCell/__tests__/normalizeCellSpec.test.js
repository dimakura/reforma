import normalizeCellSpec from '../normalizeCellSpec'

test('normalizeCellSpec', () => {
  expect(normalizeCellSpec('firstName')).toEqual({
    name: 'firstName',
    label: 'First Name',
    htmlName: 'first-name'
  })

  expect(normalizeCellSpec({
    name: 'firstName',
    label: 'name',
    autoFocus: true
  })).toEqual({
    name: 'firstName',
    label: 'name',
    htmlName: 'first-name',
    autoFocus: true
  })
})
