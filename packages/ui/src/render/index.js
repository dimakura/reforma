import isBlank from '@reforma/ui/utils/isBlank'
import defaultHint from './defaultHint'
import renderEmpty from './renderEmpty'
import renderValue from './renderValue'

export default function renderFunction(cellSpecification, model) {
  const hasObjectSpecification = (
    cellSpecification != null &&
    typeof cellSpecification === 'object'
  )

  if (
    hasObjectSpecification &&
    typeof cellSpecification.render === 'function'
  ) {
    // when we have "render" we just use it
    return cellSpecification.render(model)
  }

  const fieldName = do {
    if (cellSpecification == null) {
      null
    } else if (typeof cellSpecification === 'string') {
      cellSpecification
    } else if ('name' in cellSpecification) {
      cellSpecification.name
    }
  }

  const field = do {
    if (fieldName != null) {
      model.__type__.getFields()[fieldName]
    }
  }

  const cellValue = do {
    if (fieldName != null && model != null) {
      model[fieldName]
    }
  }

  const hint = do {
    if (
      hasObjectSpecification &&
      'as' in cellSpecification
    ) {
      cellSpecification.as
    } else {
      defaultHint(field.getType())
    }
  }

  return do {
    if (
      isBlank(cellValue) &&
      cellValue !== false
    ) {
      renderEmpty()
    } else {
      renderValue(cellValue, hint)
    }
  }
}
