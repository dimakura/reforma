export default function createString() {
  return {
    get __isType__() {
      return true
    },

    get isPrimitive() {
      return true
    },

    get name() {
      return 'string'
    }
  }
}
