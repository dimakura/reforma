import { isBlank, parseBoolean } from '@tomatosoft/gimlet'
import { camelCase } from 'lodash'

export function createModel(data) {
  if (data == null) {
    throw new Error('Model: null')
  }

  if (typeof data !== 'object') {
    throw new Error('Model: wrong props')
  }

  const { name, properties } = data

  if (isBlank(name)) {
    throw new Error('Model: name required')
  }

  if (typeof name !== 'string') {
    throw new Error('Model: name should be a string')
  }

  if (isBlank(properties)) {
    throw new Error('Model: properties required')
  }

  return createModelInternal(data)
}

// -- PRIVATE

function createModelInternal(data) {
  const name = camelCase(data.name)
  const properties = data.properties
  const isSingleton = parseBoolean(data.isSingleton, false)

  return {
    get __isModel__() {
      return true
    },

    get name() {
      return name
    },

    get isSingleton() {
      return isSingleton
    },

    get properties() {
      return properties
    }
  }
}
