import {
  isPlainObject,
  snakeCase,
  mapKeys,
  mapValues
} from 'lodash'

export default function snakeizeKeys(object) {
  if (isPlainObject(object)) {
    const flatObject = mapKeys(object, (_val, key) => snakeCase(key))
    return mapValues(flatObject, (val, _key) => snakeizeKeys(val))
  } else if (Array.isArray(object)) {
    return object.map((val) => snakeizeKeys(val))
  } else {
    return object
  }
}
