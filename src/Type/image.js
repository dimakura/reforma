export default function createImage() {
  return {
    get __isType__() {
      return true
    },

    get isPrimitive() {
      return true
    },

    get name() {
      return 'image'
    }
  }
}
