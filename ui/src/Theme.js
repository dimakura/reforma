const Theme = {}

const marginUnit = 5
const paddingUnit = 5
const spacingDiff = 1

function defineProperty(name, value) {
  Object.defineProperty(Theme, name, { value })
}

defineProperty('marginTimes', function (times) {
  return marginUnit * times + spacingDiff
})

defineProperty('paddingTimes', function (times = 1) {
  return paddingUnit * times + spacingDiff
})

defineProperty('borderColor', '#ffffff26')

export default Theme
