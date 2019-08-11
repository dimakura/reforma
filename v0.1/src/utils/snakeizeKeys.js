import {
  isPlainObject,
  snakeCase,
  mapKeys,
  mapValues
} from 'lodash'

export default function snakeizeKeys(object, except) {
  if (!Array.isArray(except)) {
    except = []
  }

  if (isPlainObject(object)) {
    const flatObject = mapKeys(object, (_val, key) => {
      return do {
        if (except.includes(key)) {
          key
        } else {
          snakeCase(key)
        }
      }
    })
    return mapValues(flatObject, (val, _key) => snakeizeKeys(val))
  } else if (Array.isArray(object)) {
    return object.map((val) => snakeizeKeys(val))
  } else {
    return object
  }
}
