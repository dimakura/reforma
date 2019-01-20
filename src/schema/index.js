import { camelCase } from 'lodash'
import urlJoin from 'url-join'
import notBlank from 'reforma/utils/notBlank'
import createDataSource from 'reforma/datasource'
import createField from './Field'

export default function createSchema(data) {
  if (data != null) {
    if (
      typeof data === 'object' &&
      'fields' in data &&
      ('baseUrl' in data || 'url' in data)
    ) {
      const schema = createSchemaInternal(data)
      const dataSource = createDataSource(schema)
      Object.defineProperty(schema, 'dataSource', {
        value: dataSource,
        writable: false
      })

      return schema
    }
  }
}

// -- PRIVATE

function createSchemaInternal(data) {
  const baseUrl = notBlank(data.url, data.baseUrl)
  const fields = data.fields.map(createField)
  const fieldsByName = fields.reduce((acc, field) => {
    acc[field.name] = field
    return acc
  }, {})
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
    get _isSchema() {
      return true
    },

    get fields() {
      return fields
    },

    get fieldsByName() {
      return fieldsByName
    },

    get modelGenerator() {
      return modelGenerator
    },

    get baseUrl() {
      return baseUrl
    },

    get isSingleton() {
      return isSingleton
    },

    resolve: function (data) {
      const model = do {
        if (typeof modelGenerator === 'function') {
          modelGenerator(data)
        } else {
          defaultGenerator(fields, data)
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
        if (isSingleton) {
          baseUrl
        } else if (typeof modelOrId === 'object') {
          urlJoin(baseUrl, modelOrId.id.toString())
        } else {
          urlJoin(baseUrl, modelOrId.toString())
        }
      }
    }
  }
}

function defaultGenerator(fields, data) {
  const result = {}

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    result[field.name] = field.getValue(data)
  }

  return result
}
