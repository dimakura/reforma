import { camelCase } from 'lodash'
import notBlank from 'reforma/utils/notBlank'
import isPresent from 'reforma/utils/isPresent'
import camelizeKeys from 'reforma/utils/camelizeKeys'

/**
 * Wrapper around API-sent errors.
 */
export default function createApiErrors(data) {
  return do {
    if (Array.isArray(data)) {
      createApiErrorsFromArray(data)
    } else if (typeof data === 'object') {
      createApiErrorsFromObject(data)
    }
  }
}

// -- PRIVATE

const notTransformableKeys = ['__global__']

function createApiErrorsFromArray(array) {
  const data = {}

  for (let i = 0; i < array.length; i++) {
    const error = array[i]

    // NB: if there are more than one errors for the given key
    // we keep only the last one.
    // We might reconsider this in the future.
    if (typeof error === 'string') {
      data['__global__'] = error
    } else if (typeof error === 'object') {
      const message = error.message
      const fieldName = do {
        const name = notBlank(error.field, error.fieldName, '__global__')
        if (notTransformableKeys.includes(name)) {
          name
        } else {
          camelCase(name)
        }
      }

      if (isPresent(message)) {
        data[fieldName] = message
      }
    }
  }

  return createApiErrorsFromObject(data)
}

function createApiErrorsFromObject(data) {
  return {
    errors: camelizeKeys(data, notTransformableKeys)
  }
}
