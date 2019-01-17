import createApiErrors from '../ApiErrors'

describe('ApiErrors', () => {
  const arrayData = [{
    field: 'firstName',
    message: 'cannot be blank'
  }, {
    fieldName: 'lastName'
  }, 'global error']

  const objectData = {
    firstName: 'cannot be blank'
  }

  test('creation', () => {
    expect(createApiErrors(objectData).errors).toEqual({
      firstName: 'cannot be blank'
    })

    expect(createApiErrors(arrayData).errors).toEqual({
      firstName: 'cannot be blank',
      __global__: 'global error'
    })
  })
})
