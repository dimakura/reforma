export default function defaultHint(type) {
  return do {
    if (type.name === 'integer') {
      'number:0'
    } else if (type.name === 'float') {
      'number:2'
    } else if (type.name === 'string') {
      'string'
    } else if (type.name === 'bool') {
      'bool'
    } else if (type.name === 'datetime') {
      'date'
    } else if (type.__isArray__) {
      `array:${defaultHint(type.valueType)}`
    } else {
      'string'
    }
  }
}
