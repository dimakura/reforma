import { get, camelCase } from 'lodash'
import urlJoin from 'url-join'
import notBlank from 'reforma/utils/notBlank'
import isBlank from 'reforma/utils/isBlank'
import createDataSource from 'reforma/datasource'
import createField from './Field'

const schemaNames = new Set()

export default function createSchema(data) {
  validateSchema(data)

  const schema = createSchemaInternal(data)
  const dataSource = createDataSource(schema)
  Object.defineProperty(schema, 'dataSource', {
    value: dataSource,
    writable: false
  })

  return schema
}

// @test-only
export function __reset__() {
  schemaNames.clear()
}


// -- PRIVATE

function schemaName(rawName) {
  if (typeof rawName === 'string') {
    return camelCase(rawName)
  }
}

function validateSchema(data) {
  const name = schemaName(get(data, 'name'))
  const fields = get(data, 'fields')
  const url = get(data, 'url', get(data, 'baseUrl'))

  if (isBlank(name)) {
    throw new Error(`Empty schema name`)
  }

  if (schemaNames.has(name)) {
    throw new Error(`Schema name cannot be used twice: ${name}`)
  }

  if (isBlank(fields) || !Array.isArray(fields)) {
    throw new Error(`Wrong schema fields: ${fields}`)
  }

  if (isBlank(url)) {
    throw new Error('Specify schema url')
  }
}

function createSchemaInternal(data) {
  const name = schemaName(data.name)
  schemaNames.add(name)
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

    get name() {
      return name
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
