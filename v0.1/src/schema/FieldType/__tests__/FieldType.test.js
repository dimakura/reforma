import { getSchema } from 'Test/factories'
import createFieldType from '../index'

describe('FieldType', () => {
  describe('createFieldType', () => {
    test('Schema', () => {
      const schema = getSchema()
      const type = createFieldType(schema)

      expect(type.name).toBe('Schema')
      expect(type.formatValue({
        id: 1
      })).toBe('[object Object]')
      expect(type.schema).toBe(schema)
      expect(type._isFieldType).toBe(true)
    })

    test('string', () => {
      const type = createFieldType('string')

      expect(type.name).toBe('string')
      expect(type.formatValue('one')).toBe('one')
      expect(type._isFieldType).toBe(true)
    })

    test('number', () => {
      const type = createFieldType('number')

      expect(type.name).toBe('number')
      expect(type.decimals).toBe(2)
      expect(type.formatValue(1000)).toBe('1,000.00')
      expect(type._isFieldType).toBe(true)
    })

    test('integer', () => {
      const type = createFieldType('integer')

      expect(type.name).toBe('number')
      expect(type.decimals).toBe(0)
      expect(type.formatValue(1000)).toBe('1,000')
      expect(type._isFieldType).toBe(true)
    })

    test('date', () => {
      const type = createFieldType('date')

      expect(type.name).toBe('date')
      expect(type.format).toBe('DD-MMM-YYYY hh:mm:ss')
      expect(type.formatValue('2019-01-17 03:22:13')).toBe('17-Jan-2019 03:22:13')
      expect(type._isFieldType).toBe(true)
    })

    test('wrong data', () => {
      const wrongData = [null, 'wrong-type']

      for (let data of wrongData) {
        expect(createFieldType(data)).toBeUndefined()
      }
    })
  })
})
