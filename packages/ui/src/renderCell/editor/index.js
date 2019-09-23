import normalizeCellSpec from '../normalizeCellSpec'
import defaultHint from '../defaultHint'
import renderEditor from './renderEditor'

export default function renderFunction(spec, model) {
  spec = normalizeCellSpec(spec)
  const fieldName = spec.name
  const field = do {
    if (fieldName != null) {
      model.__type__.getFields()[fieldName]
    }
  }
  const value = do {
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

  function onChange(newValue) {
    model[fieldName] = newValue
  }

  return renderEditor({
    value,
    hint,
    onChange,
    fieldName,
    spec
  })
}
