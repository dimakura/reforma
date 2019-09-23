import { kebabCase, merge, startCase } from 'lodash'

export default function normalizeCellSpec(spec) {
  spec = do {
    if (typeof spec === 'string') {
      ({ name: spec })
    } else {
      merge({}, spec)
    }
  }

  spec.label = label(spec)
  spec.htmlName = kebabCase(spec.name)

  return spec
}

// -- PRIVATE

function label(spec) {
  return do {
    if ('label' in spec) {
      spec.label
    } else {
      startCase(spec.name)
    }
  }
}
