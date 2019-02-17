import { get } from 'lodash'
import notBlank from 'reforma/utils/notBlank'

export function createColumns(schema, data) {
  const columns = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]

    const field = do {
      if (typeof row === 'string') {
        schema.fieldsByName[row]
      } else if (typeof row === 'object' && 'name' in row) {
        schema.fieldsByName[row.name]
      }
    }

    if (field != null) {
      columns.push(createColumn(field, row))
    }
  }

  return columns
}

export function createColumn(field, data) {
  const caption = get(data, 'caption')
  const renderer = get(data, 'renderer')
  const editorProps = get(data, 'editorProps')

  return {
    get _isColumn() {
      return true
    },

    /**
     * Base Field object, from which this Column was derived.
     */
    get field() {
      return field
    },

    /**
     * Column's caption overrides that of the Field.
     */
    get caption() {
      return caption
    },

    /**
     * Column's renderer overrides default Field renderer.
     */
    get renderer() {
      return renderer
    },

    get editorProps() {
      return editorProps
    },

    getCaption() {
      return notBlank(caption, field.caption)
    },

    getFormattedValue(model) {
      return do {
        if (typeof renderer === 'function') {
          renderer(model)
        } else {
          field.getFormattedValue(model)
        }
      }
    },

    getEditorProps() {
      return notBlank(editorProps, field.editorProps)
    }
  }
}
