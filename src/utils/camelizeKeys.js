import {
  isPlainObject,
  camelCase,
  mapKeys,
  mapValues
} from 'lodash'

export default function camelizeKeys(object, except) {
  if (!Array.isArray(except)) {
    except = []
  }

  if (isPlainObject(object)) {
    const flatObject = mapKeys(object, (_val, key) => {
      return do {
        if (except.includes(key)) {
          key
        } else {
          camelCase(key)
        }
      }
    })
    return mapValues(flatObject, (val, _key) => camelizeKeys(val))
  } else if (Array.isArray(object)) {
    return object.map((val) => camelizeKeys(val))
  } else {
    return object
  }
}
