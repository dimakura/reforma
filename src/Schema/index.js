import { camelCase } from 'lodash'
import urlJoin from 'url-join'
import createField from './Field'

export default function createSchema(data) {
  if (data != null) {
    if (
      typeof data === 'object' &&
      'name' in data &&
      'fields' in data
    ) {
      return createSchemaInternal(data)
    }
  }
}

// -- PRIVATE

function createSchemaInternal(data) {
  const name = data.name
  const fields = data.fields.map(createField)
  const modelGenerator = data.modelGenerator || data.generator
  const baseUrl = data.baseUrl || data.url || camelCase(name)

  return {
    name,
    fields,
    modelGenerator,
    baseUrl,

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
