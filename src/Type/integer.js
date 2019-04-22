export default function createInteger() {
  return {
    get __isType__() {
      return true
    },

    get isPrimitive() {
      return true
    },

    get name() {
      return 'integer'
    }
  }
}
