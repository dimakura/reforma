import { get, startCase } from 'lodash'
import createFieldType from './FieldType'

export default function createField(data) {
  if (data != null) {
    if (typeof data === 'string') {
      return createField({
        name: data
      })
    } else if (typeof data === 'object' && 'name' in data) {
      return createFieldInternal(data)
    }
  }
}

// -- PRIVATE

function createFieldInternal(data) {
  const name = get(data, 'name')
  const caption = get(data, 'caption', startCase(name))
  const type = createFieldType(get(data, 'type', 'string'))

  function getValue(model) {
    return get(model, name)
  }

  return {
    name,
    caption,
    type,
    getValue,

    getFormattedValue: function (model) {
      const value = getValue(model)

      if (value != null) {
        return type.formatValue(value)
      }
    }
  }
}
