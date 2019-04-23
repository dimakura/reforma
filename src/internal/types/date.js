import { get } from 'lodash'

const defaultFormat = 'DD-MMM-YYYY hh:mm:ss'

export default function createDate(props) {
  const format = get(props, 'format', defaultFormat)

  return {
    get __isType__() {
      return true
    },

    get isPrimitive() {
      return true
    },

    get name() {
      return 'date'
    },

    get format() {
      return format
    }
  }
}
