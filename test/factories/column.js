import { createColumn, createColumns } from 'reforma/ui/Column'
import { getField } from './field'
import { getSchema } from './schema'

export function getColumn() {
  const field = getField()

  return createColumn(field)
}

export function getColumns(schema) {
  return createColumns(schema, [
    'firstName',
    'lastName'
  ])
}
