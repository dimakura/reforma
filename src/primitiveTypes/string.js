import primitiveType from '../primitiveType'
import { registerType } from '../registry'

const stringType = primitiveType.merge({
  serialize: toString,
  deserialize: toString
})

registerType('string', stringType)
registerType('text', stringType)

export default stringType

// -- PRIVATE

function toString(value) {
  return do {
    if (value != null) {
      if (typeof value === 'string') {
        value
      } else if (typeof value.toString === 'function') {
        value.toString()
      }
    }
  }
}
