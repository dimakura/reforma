import createFieldType from '../FieldType'

describe('FieldType', () => {
  describe('createFieldType', () => {
    test('string', () => {
      const type = createFieldType('string')

      expect(type.name).toBe('string')
      expect(type.formatValue('one')).toBe('one')
    })

    test('number', () => {
      const type = createFieldType('number')

      expect(type.name).toBe('number')
      expect(type.decimals).toBe(2)
      expect(type.formatValue(1000)).toBe('1,000.00')
    })

    test('integer', () => {
      const type = createFieldType('integer')

      expect(type.name).toBe('number')
      expect(type.decimals).toBe(0)
      expect(type.formatValue(1000)).toBe('1,000')
    })

    test('date', () => {
      const type = createFieldType('date')

      expect(type.name).toBe('date')
      expect(type.format).toBe('DD-MMM-YYYY hh:mm:ss')
      expect(type.formatValue('2019-01-17 03:22:13')).toBe('17-Jan-2019 03:22:13')
    })

    test('wrong data', () => {
      const wrongData = [null, 'wrong-type']

      for (let data of wrongData) {
        expect(createFieldType(data)).toBeUndefined()
      }
    })
  })
})
