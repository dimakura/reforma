// TODOs:
// -[X] array type specs
// -[X] map type + specs
// -[X] linter
// -[X] setup CI
// -[X] field interface
// -[X] move calc+id+validate into fields
// -[X] user-defined types
// -[X] built-in types instantiation
// -[X] user-defined types instantiation
// -[X] user defined type validations
// -[X] built-in validations
// -[X] serialization
// -[X] HTTP methods
// -[X] collection data source
// -[ ] record data source

import {
  createArrayType,
  createMapType,
  createPrimitiveType,
  createType,
  primitiveTypes
} from './type'

import config from './config'
import createCollectionDS from './collectionDS'
import http from './http'

const Reforma = {}

primitiveTypes.forEach((primitiveTypeName) => {
  Object.defineProperty(Reforma, primitiveTypeName, {
    value: createPrimitiveType(primitiveTypeName)
  })
})

Object.defineProperty(Reforma, 'arrayOf', {
  value: function (valueType) {
    return createArrayType(valueType)
  }
})

Object.defineProperty(Reforma, 'mapOf', {
  value: function (keyType, valueType) {
    return createMapType(keyType, valueType)
  }
})

Object.defineProperty(Reforma, 'createType', {
  value: createType
})

Object.defineProperty(Reforma, 'config', {
  value: config
})

Object.defineProperty(Reforma, 'http', {
  value: http
})

Object.defineProperty(Reforma, 'createCollectionDS', {
  value: createCollectionDS
})

export default Reforma
