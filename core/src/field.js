// Field instance:
//
// - `__isField__: true`
//
// - `getName(): String`, returns field name
// - `setName(String)`, sets field name (only once!)
//
// - `id: Field`, sets field `id` property to `true`
// - `getId(): boolean`, returns field `id` property
// - `setId(boolean): Field`, sets field `id` property
//
// - `calc(function): Field`, sets field `calc` property (only once!)
// - `getCalc(): function`, returns field `calc` property
//
// - `validate(function): Field`, adds validation to the field
// - `getValidators(): Array[function]`, returns field validators

const nameRegex = /^[a-z][a-z0-9_]*$/i

export function createField(type) {
  if (!type.__isType__) {
    throw new Error(`Field type is not a valid Reforma type: ${type}`)
  }

  const privateData = {
    name: null,
    id: false,
    calc: null,
    validators: []
  }

  const field = {}
  defineFieldness(field)
  defineFieldType(field, type)
  defineNameMethods(field, privateData)
  defineIdMethods(field, privateData)
  defineCalcMethods(field, privateData)
  defineValidateMethods(field, privateData)

  return field
}

// -- PRIVATE

function defineFieldness(field) {
  Object.defineProperty(field, '__isField__', { value: true })
}

function defineFieldType(field, type) {
  function getType() {
    return type
  }

  Object.defineProperty(field, 'getType', { value: getType })
}

function defineNameMethods(field, data) {
  function getName() {
    return data.name
  }

  function setName(name) {
    const isValidName = typeof name === 'string' && nameRegex.test(name)

    if (!isValidName) {
      throw new Error(`Illegal field name: ${name}`)
    }

    if (data.name != null) {
      throw new Error('Field name is already defined')
    }

    data.name = name
  }

  Object.defineProperty(field, 'getName', { value: getName })
  Object.defineProperty(field, 'setName', { value: setName })
}

function defineIdMethods(field, data) {
  function getter() {
    data.id = true
    return field
  }

  function getId() {
    return data.id
  }

  function setId(newValue) {
    data.id = !!newValue
    return field
  }

  Object.defineProperty(field, 'id', { get: getter })
  Object.defineProperty(field, 'getId', { value: getId })
  Object.defineProperty(field, 'setId', { value: setId })
}

function defineCalcMethods(field, data) {
  function getCalc() {
    return data.calc
  }

  function calc(calcFn) {
    if (typeof calcFn !== 'function') {
      throw new Error('Specify function in `calc`')
    }

    if (data.calc != null) {
      throw new Error('Only single assignment permitted in `calc`')
    }

    data.calc = calcFn
    return field
  }

  Object.defineProperty(field, 'getCalc', { value: getCalc })
  Object.defineProperty(field, 'calc', { value: calc })
}

function defineValidateMethods(field, data) {
  function getValidators() {
    return data.validators
  }

  function valiate(validateFn) {
    if (typeof validateFn !== 'function') {
      throw new Error('Specify function in `validate`')
    }

    data.validators.push(validateFn)

    return field
  }

  Object.defineProperty(field, 'getValidators', { value: getValidators })
  Object.defineProperty(field, 'validate', { value: valiate })
}
