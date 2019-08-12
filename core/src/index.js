import {
  primitiveTypes,
  createPrimitiveType,
  createArrayType
} from './type'

const Reforma = {}

primitiveTypes.forEach((primitiveTypeName) => {
  Object.defineProperty(Reforma, primitiveTypeName, {
    get: function() {
      return createPrimitiveType(primitiveTypeName)
    }
  })
})

Object.defineProperty(Reforma, 'arrayOf', {
  value: function(type) {
    return createArrayType(type)
  }
})

// TODOs:
// -[ ] array type specs
// -[ ] map type + specs
// -[ ] linter
// -[ ] user-defined types + specs
// -[ ] built-in types instantiation + specs
// -[ ] user-defined types instantiation + specs
// -[ ] validations + specs
// -[ ] built-in validations + specs
// -[ ] built-in types serialization + specs
// -[ ] user-defined types serialization + specs

export default Reforma
