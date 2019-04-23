import createBool from './internal/types/bool'
import createDate from './internal/types/date'
import createImage from './internal/types/image'
import createInteger from './internal/types/integer'
import createFloat from './internal/types/float'
import createString from './internal/types/string'

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
