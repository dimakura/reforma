import { get, startCase } from 'lodash'
import { createType } from 'reforma/Type'
import isBlank from 'reforma/utils/isBlank'

export function createFieldDescriptor(props) {
  if (props == null) {
    throw new Error('FieldDescriptor: null')
  }

  if (typeof props === 'string') {
    return createFieldDescriptor({
      name: props
    })
  }

  if (typeof props !== 'object') {
    throw new Error('FieldDescriptor: wrong props')
  }

  if (isBlank(props.name)) {
    throw new Error('FieldDescriptor: name required')
  }

  return createFieldDescriptorInternal(props)
}

// -- PRIVATE

function createFieldDescriptorInternal(props) {
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
    get __isFieldDescriptor__() {
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
