import primitiveType from './primitive'
import { registerType } from '../registry'

const boolType = primitiveType.merge({
  serialize(value) {
    return do {
      if (value === true || value === false) {
        value
      }
    }
  },

  deserialize(value) {
    return do {
      if (value === true || value === false) {
        value
      } else if (value === 1 || value === '1' || value === 'true') {
        true
      } else if (value === 0 || value === '0' || value === 'false') {
        false
      }
    }
  }
})

registerType('bool', boolType)
registerType('boolean', boolType)

export default boolType
