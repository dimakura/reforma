import isBlank from './isBlank'

export default function isPresent(value) {
  return !isBlank(value)
}
