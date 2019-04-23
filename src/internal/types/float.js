import { get } from 'lodash'

const defaultDecimals = 2

export default function createFloat(props) {
  const decimals = get(props, 'decimals', defaultDecimals)

  return {
    get __isType__() {
      return true
    },

    get isPrimitive() {
      return true
    },

    get name() {
      return 'float'
    },

    get decimals() {
      return decimals
    }
  }
}
