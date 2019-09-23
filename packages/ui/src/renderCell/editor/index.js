import defaultHint from '../defaultHint'
import renderEditor from './renderEditor'

export default function renderFunction(spec, model) {
  const fieldName = spec.name

  const value = do {
    if (fieldName != null) {
      model[fieldName]
    }
  }

  const hint = do {
    if ('as' in spec) {
      spec.as
    } else if (fieldName != null) {
      const field = model.__type__.getFields()[fieldName]
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
    spec
  })
}
