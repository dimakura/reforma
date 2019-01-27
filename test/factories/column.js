import { createColumn } from 'reforma/ui/Column'
import { getField } from './field'

export function getColumn() {
  const field = getField()

  return createColumn(field)
}
