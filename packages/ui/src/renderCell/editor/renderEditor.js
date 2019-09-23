import normalizeHint from '../normalizeHint'
import stringEditor from './stringEditor'

export default function renderEditor(props) {
  const hints = normalizeHint(props.hint)
  return renderEditorInternal(props, hints)
}

// -- PRIVATE

function renderEditorInternal(props, hints) {
  const head = hints.shift()

  return do {
    if (head === 'string') {
      stringEditor(props, hints)
    } else {
      `NO EDITOR FOR: ${head}`
    }
  }
}
