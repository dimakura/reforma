import { Map } from 'immutable'
import isType from './isType'

// type registry
let registry = Map()

/**
 * Register type.
 */
export function registerType(name, type) {
  if (!isValidTypeName(name)) {
    throw `Cannot register type: invalid name ${name}`
  }

  if (registry.has(name)) {
    throw `Cannot register ${name}: already registered`
  }

  if (!isType(type)) {
    throw `Cannot register ${name}: not a type`
  }

  // TODO: naming for user-defined types

  registry = registry.set(name, type)
}

/**
 * Get type by name.
 * Throw exception if type cannot be found.
 */
export function getType(name) {
  if (registry.has(name)) {
    return registry.get(name)
  }

  throw `No such type: ${name}`
}

// @test-only
export function unregisterType(name) {
  registry = registry.delete(name)
}

// -- PRIVATE

const typeRegex = /^[a-z][a-z0-9_]*$/i
const userDefinedRegex = /^[A-Z][a-zA-Z0-9_]$/

function isValidTypeName(typeName) {
  return (
    typeName != null &&
    typeof typeName === 'string' &&
    typeRegex.test(typeName)
  )
}
