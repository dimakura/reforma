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
// -[ ] built-in type validations
// -[ ] user defined type validations
// -[ ] built-in types serialization
// -[ ] user-defined types serialization

import {
  primitiveTypes,
  createPrimitiveType,
  createArrayType,
  createMapType,
  createType
} from './type'

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

export default Reforma
