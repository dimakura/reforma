import renderString from './renderString'
import renderText from './renderText'

export default function renderValue(value, hint) {
  const hints = do {
    if (hint == null) {
      []
    } else if (Array.isArray(hint)) {
      [...hint]
    } else {
      hint.split(':')
    }
  }

  return renderValueInternal(value, hints)
}

// -- PRIVATE

function renderValueInternal(value, hints) {
  const head = hints.shift()

  return do {
    if (head === 'string') {
      renderString(value, hints)
    } else if (head === 'text') {
      renderText(value, hints)
    } else {
      renderString(value, hints)
    }
  }
}
