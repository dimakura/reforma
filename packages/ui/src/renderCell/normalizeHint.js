export default function normalizeHint(hint) {
  return do {
    if (hint == null) {
      []
    } else if (Array.isArray(hint)) {
      [...hint]
    } else {
      hint.split(':')
    }
  }
}
