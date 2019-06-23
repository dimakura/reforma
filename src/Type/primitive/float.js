import primitiveType from './primitive'
import { registerType } from '../registry'

const floatType = primitiveType.merge({
  serialize: forceFloat,
  deserialize: forceFloat
})

registerType('float', floatType)
registerType('double', floatType)

export default floatType

// -- PRIVATE

function forceFloat(value) {
  value = Number.parseFloat(value)

  return do {
    if (!Number.isNaN(value)) {
      value
    }
  }
}
