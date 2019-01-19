import { get } from 'lodash'

export default function createUIField(field, data) {
  const caption = get(data, 'caption')
  const renderer = get(data, 'renderer')

  return {
    /**
     * Base Field object, from which this UIField was derived.
     */
    get field() {
      return field
    },

    /**
     * UIField's caption might override that of the Field.
     */
    get caption() {
      return caption
    },

    /**
     * UIField renderer might override default Field renderer.
     */
    get renderer() {
      return renderer
    }
  }
}
