import { camelCase } from 'lodash'
import urlJoin from 'url-join'
import notBlank from 'reforma/utils/notBlank'
import createField from './Field'

export default function createSchema(data) {
  if (data != null) {
    if (
      typeof data === 'object' &&
      'fields' in data &&
      ('baseUrl' in data || 'url' in data)
    ) {
      return createSchemaInternal(data)
    }
  }
}

// -- PRIVATE

function createSchemaInternal(data) {
  const baseUrl = notBlank(data.url, data.baseUrl)
  const fields = data.fields.map(createField)
  const modelGenerator = notBlank(data.modelGenerator, data.generator)
  const isSingleton = do {
    if ('singleton' in data) {
      !!data.singleton
    } else if ('isSingleton' in data) {
      !!data.isSingleton
    } else {
      false
    }
  }

  return {
    fields,
    modelGenerator,
    baseUrl,
    isSingleton,

    resolve: function (data) {
      const model = do {
        if (typeof modelGenerator === 'function') {
          modelGenerator(data)
        } else {
          defaultGenerator(this, data)
        }
      }

      if (!('id' in model)) {
        model.id = data.id
      }

      model.__schema__ = this

      return model
    },

    getUrl: function () {
      return baseUrl
    },

    getModelUrl: function (modelOrId) {
      return do {
        if (typeof modelOrId === 'object') {
          urlJoin(baseUrl, modelOrId.id.toString())
        } else {
          urlJoin(baseUrl, modelOrId.toString())
        }
      }
    }
  }
}

function defaultGenerator(schema, data) {
  const result = {}

  for (let i = 0; i < schema.fields.length; i++) {
    const field = schema.fields[i]
    result[field.name] = field.getValue(data)
  }

  return result
}
