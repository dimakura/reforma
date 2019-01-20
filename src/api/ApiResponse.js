import camelizeKeys from 'reforma/utils/camelizeKeys'
import createApiErrors from './ApiErrors'

export default function createApiResponse(data) {
  return do {
    if (isAxiosResponse(data)) {
      createApiResponseFromAxiosResponse(data)
    } else if (isError(data)) {
      createApiResponseFromError(data)
    }
  }
}

// -- PRIVATE

function isAxiosResponse(data) {
  return (
    data != null &&
    typeof data === 'object' &&
    'data' in data &&
    'status' in data
  )
}

function isError(data) {
  return (
    data != null &&
    'message' in data &&
    'stack' in data
  )
}

function createApiResponseFromAxiosResponse(axiosResponse) {
  const status = axiosResponse.status
  const isSuccess = status < 400
  const data = axiosResponse.data.data

  return do {
    if (isSuccess) {
      ({
        isSuccess: true,
        status,
        data: camelizeKeys(data)
      })
    } else {
      ({
        isSuccess: false,
        status,
        errors: createApiErrors(data)
      })
    }
  }
}

function createApiResponseFromError(error) {
  return {
    status: -1,
    isSuccess: false,
    errors: createApiErrors([error])
  }
}
