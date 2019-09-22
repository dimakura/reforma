import { startCase } from 'lodash'

export default function labelForField(fld) {
  return do {
    if (typeof fld === 'string') {
      startCase(fld)
    } else if ('label' in fld) {
      fld.label
    } else {
      startCase(fld.name)
    }
  }
}
