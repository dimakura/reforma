export default function createBool() {
  return {
    get __isType__() {
      return true
    },

    get isPrimitive() {
      return true
    },

    get name() {
      return 'bool'
    }
  }
}
