import createApiErrors from '../ApiErrors'

describe('ApiErrors', () => {
  const arrayData = [{
    field: 'first_name',
    message: 'cannot be blank'
  }, {
    fieldName: 'last_name'
  }, 'global error']

  const objectData = {
    first_name: 'cannot be blank',
    __global__: 'global error'
  }

  test('creation', () => {
    expect(createApiErrors(objectData).errors).toEqual({
      firstName: 'cannot be blank',
      __global__: 'global error'
    })

    expect(createApiErrors(arrayData).errors).toEqual({
      firstName: 'cannot be blank',
      __global__: 'global error'
    })
  })
})
