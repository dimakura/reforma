import createBool from './bool'
import createDate from './date'
import createImage from './image'
import createInteger from './integer'
import createFloat from './float'
import createString from './string'

export function createType(name, props) {
  const factory = factories[name]

  if (typeof factory === 'function') {
    return factory(props)
  }

  throw new Error(`Cannot create type: ${name}`)
}

// -- PRIVATE

const factories = {
  bool: createBool,
  boolean: createBool,
  date: createDate,
  float: createFloat,
  image: createImage,
  integer: createInteger,
  string: createString
}
