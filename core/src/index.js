import { createPrimitiveType, primitiveTypes } from './type'

const Reforma = {}

primitiveTypes.forEach((primitiveTypeName) => {
  Object.defineProperty(Reforma, primitiveTypeName, {
    get: function() {
      return createPrimitiveType(primitiveTypeName)
    }
  })
})

export default Reforma
