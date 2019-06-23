import { isType, isPrimitiveType, serialize, deserialize } from './utils'
import { getType } from './registry'
require('./primitive')

export default {
  isType,
  isPrimitiveType,
  getType,
  serialize,
  deserialize
}
