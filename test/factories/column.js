import { merge, omit } from 'lodash'
import { createColumn, createColumns } from 'reforma/ui/Column'
import { getField } from './field'
import { getSchema } from './schema'

const defaultData = {
  field: getField()
}

export function getColumn(data) {
  data = merge({}, defaultData, data)
  const field = data.field

  return createColumn(field, omit(data, ['field']))
}

export function getColumns(schema) {
  return createColumns(schema, [
    'firstName',
    'lastName'
  ])
}
