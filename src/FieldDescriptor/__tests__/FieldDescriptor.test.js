import { forEach } from 'lodash'
import { createFieldDescriptor } from 'reforma'

describe('FieldDescriptor', () => {
  test('wrong ways', () => {
    const data = {
      'null': null,
      'wrong props': false,
      'name required': { name: '' }
    }

    forEach(data, (props, error) => {
      const errorMessage = `FieldDescriptor: ${error}`
      expect(() => createFieldDescriptor(props)).toThrow(errorMessage)
    })
  })

  test('default descriptor', () => {
    function testDefaultDescriptor(descriptor) {
      expect(descriptor.__isFieldDescriptor__).toBe(true)
      expect(descriptor.name).toBe('firstName')
      expect(descriptor.type.name).toBe('string')
      expect(descriptor.caption).toBe('First Name')
      expect(descriptor.tooltip).toBeUndefined()
    }

    const descriptor = createFieldDescriptor('firstName')
    const descriptor2 = createFieldDescriptor({
      name: 'firstName',
      type: 'string'
    })

    testDefaultDescriptor(descriptor)
    testDefaultDescriptor(descriptor2)
  })

  test('custom descriptor', () => {
    const descriptor = createFieldDescriptor({
      name: 'salary',
      type: {
        name: 'float',
        decimals: 2
      },
      caption: 'Net Salary',
      tooltip: 'Salary after taxes'
    })

    expect(descriptor.__isFieldDescriptor__).toBe(true)
    expect(descriptor.name).toBe('salary')
    expect(descriptor.type.name).toBe('float')
    expect(descriptor.type.decimals).toBe(2)
    expect(descriptor.caption).toBe('Net Salary')
    expect(descriptor.tooltip).toBe('Salary after taxes')
  })
})
