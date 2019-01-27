import { get, set, startCase } from 'lodash'
import createFieldType from './FieldType'
import isPresent from 'reforma/utils/isPresent'
import notBlank from 'reforma/utils/notBlank'

export default function createField(data) {
  if (data != null) {
    if (typeof data === 'string') {
      return createField({
        name: data
      })
    } else if (
      typeof data === 'object' &&
      isPresent(data.name)
    ) {
      return createFieldInternal(data)
    }
  }
}

// -- PRIVATE

function createFieldInternal(data) {
  const name = data.name
  const caption = notBlank(data.caption, startCase(name))
  const type = createFieldType(notBlank(data.type, 'string'))

  function getValue(model) {
    return get(model, name)
  }

  function setValue(model, value) {
    return set(model, name, value)
  }

  return {
    get _isField() {
      return true
    },

    get name() {
      return name
    },

    get caption() {
      return caption
    },

    get type() {
      return type
    },

    getValue,

    setValue,

    getFormattedValue: function (model) {
      const value = getValue(model)

      if (value != null) {
        return type.formatValue(value)
      }
    }
  }
}
