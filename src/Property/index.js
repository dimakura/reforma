import { isBlank } from '@tomatosoft/gimlet'
import { get, startCase } from 'lodash'
import { createType } from 'reforma/Type'

export function createProperty(props) {
  if (props == null) {
    throw new Error('Property: null')
  }

  if (typeof props === 'string') {
    return createProperty({
      name: props
    })
  }

  if (typeof props !== 'object') {
    throw new Error('Property: wrong props')
  }

  if (isBlank(props.name)) {
    throw new Error('Property: name required')
  }

  return createPropertyInternal(props)
}

// -- PRIVATE

function createPropertyInternal(props) {
  const name = props.name
  const type = createTypeInternal(props.type)
  const tooltip = props.tooltip

  const caption = do {
    if (isBlank(props.caption)) {
      startCase(name)
    } else {
      props.caption
    }
  }

  return {
    get __isProperty__() {
      return true
    },

    get name() {
      return name
    },

    get type() {
      return type
    },

    get caption() {
      return caption
    },

    get tooltip() {
      return tooltip
    }
  }
}

function createTypeInternal(props) {
  return do {
    if (isBlank(props)) {
      createType('string')
    } else if (typeof props === 'string') {
      createType(props)
    } else {
      createType(props.name, props)
    }
  }
}
