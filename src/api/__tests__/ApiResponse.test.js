import createApiResponse from '../ApiResponse'

describe('ApiResponse', () => {
  const axiosSuccess = {
    data: {
      data: {
        first_name: 'Dimitri',
        last_name: 'Kurashvili'
      }
    },
    status: 200
  }

  const axiosBadRequest = {
    data: {
      data: [{
        field: 'first_name',
        message: 'cannot be blank'
      }]
    },
    status: 400
  }

  const error = new Error('Something went wrong')

  test('success axios response', () => {
    const resp = createApiResponse(axiosSuccess)

    expect(resp).toEqual({
      isSuccess: true,
      status: 200,
      data: {
        firstName: 'Dimitri',
        lastName: 'Kurashvili'
      }
    })
  })

  test('bad-request axios response', () => {
    const resp = createApiResponse(axiosBadRequest)

    expect(resp).toEqual({
      isSuccess: false,
      status: 400,
      errors: {
        errors: {
          firstName: 'cannot be blank'
        }
      }
    })
  })

  test('exception response', () => {
    const resp = createApiResponse(error)

    expect(resp).toEqual({
      status: -1,
      isSuccess: false,
      errors: {
        errors: {
          __global__: 'Something went wrong'
        }
      }
    })
  })
})
