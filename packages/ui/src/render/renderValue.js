import renderArray from './renderArray'
import renderBool from './renderBool'
import renderDate from './renderDate'
import renderNumber from './renderNumber'
import renderString from './renderString'
import renderTag from './renderTag'
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
    } else if (head === 'tag') {
      renderTag(value, hints)
    } else if (head === 'bool') {
      renderBool(value, hints)
    } else if (head === 'number') {
      renderNumber(value, hints)
    } else if (head === 'date') {
      renderDate(value, hints)
    } else if (head === 'array') {
      renderArray(value, hints)
    } else {
      value.toString()
    }
  }
}
