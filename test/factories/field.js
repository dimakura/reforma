import { merge } from 'lodash'
import createField from 'reforma/schema/Field'

const defaultData = {
  name: 'firstName'
}

export function getField(data) {
  data = merge({}, defaultData, data)
  return createField(data)
}
