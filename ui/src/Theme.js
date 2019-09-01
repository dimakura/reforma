const Theme = {}

function defineProperty(name, value) {
  Object.defineProperty(Theme, name, { value })
}

defineProperty('paddingUnit', 4)
defineProperty('marginUnit', 4)

export default Theme
