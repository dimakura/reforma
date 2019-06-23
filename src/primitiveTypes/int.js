import primitiveType from '../primitiveType'
import { registerType } from '../registry'

const intType = primitiveType.merge({
  serialize: forceInt,
  deserialize: forceInt
})

registerType('int', intType)
registerType('integer', intType)

export default intType

// -- PRIVATE

function forceInt(value) {
  value = Number.parseInt(value, 10)

  return do {
    if (!Number.isNaN(value)) {
      value
    }
  }
}
