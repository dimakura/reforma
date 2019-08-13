// TODOs:
// -[X] array type specs
// -[X] map type + specs
// -[X] linter
// -[X] setup CI
// -[-] field interface
// -[ ] calc+id+validate into fields
// -[ ] user-defined types + specs
// -[ ] built-in types instantiation + specs
// -[ ] user-defined types instantiation + specs
// -[ ] validations + specs
// -[ ] built-in validations + specs
// -[ ] built-in types serialization + specs
// -[ ] user-defined types serialization + specs

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
