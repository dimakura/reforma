import { get } from 'lodash'

export default function createColumn(field, data) {
  const caption = get(data, 'caption')
  const renderer = get(data, 'renderer')

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
    }
  }
}
