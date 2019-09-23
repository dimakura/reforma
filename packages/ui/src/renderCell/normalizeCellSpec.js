export default function normalizeCellSpec(spec) {
  return do {
    if (typeof spec === 'string') {
      ({ name: spec })
    } else {
      spec
    }
  }
}
