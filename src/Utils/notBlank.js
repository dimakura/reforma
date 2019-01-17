import isPresent from './isPresent'

/**
 * Returns first not blank object.
 */
export default function notBlank() {
  for (let i = 0; i < arguments.length; i++) {
    const value = arguments[i]

    if (isPresent(value)) {
      return value
    }
  }
}
