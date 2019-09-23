import isBlank from '@reforma/ui/utils/isBlank'
import normalizeCellSpec from '../normalizeCellSpec'
import defaultHint from '../defaultHint'
import renderEmpty from './renderEmpty'
import renderValue from './renderValue'

export default function renderFunction(spec, model) {
  spec = normalizeCellSpec(spec)

  if ('render' in spec) {
    // when we have "render" and we just use it
    return spec.render(model)
  }

  const fieldName = spec.name

  const field = do {
    if (fieldName != null) {
      model.__type__.getFields()[fieldName]
    }
  }

  const cellValue = do {
    if (fieldName != null) {
      model[fieldName]
    }
  }

  const hint = do {
    if ('as' in spec) {
      spec.as
    } else if (field != null) {
      defaultHint(field.getType())
    }
  }

  return do {
    if (isBlank(cellValue) && cellValue !== false) {
      renderEmpty()
    } else {
      renderValue(cellValue, hint)
    }
  }
}
