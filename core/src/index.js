import {
  primitiveTypes,
  createPrimitiveType,
  createArrayType,
  createMapType
} from './type'

const Reforma = {}

primitiveTypes.forEach((primitiveTypeName) => {
  Object.defineProperty(Reforma, primitiveTypeName, {
    get: function () {
      return createPrimitiveType(primitiveTypeName)
    }
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

// TODOs:
// -[X] array type specs
// -[X] map type + specs
// -[ ] linter
// -[ ] setup CI
// -[ ] user-defined types + specs
// -[ ] built-in types instantiation + specs
// -[ ] user-defined types instantiation + specs
// -[ ] validations + specs
// -[ ] built-in validations + specs
// -[ ] built-in types serialization + specs
// -[ ] user-defined types serialization + specs

export default Reforma
