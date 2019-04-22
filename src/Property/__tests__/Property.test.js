import { forEach } from 'lodash'
import { createProperty } from 'reforma'

describe('Property', () => {
  test('wrong ways', () => {
    const data = {
      'null': null,
      'wrong props': false,
      'name required': { name: '' }
    }

    forEach(data, (props, error) => {
      const errorMessage = `Property: ${error}`
      expect(() => createProperty(props)).toThrow(errorMessage)
    })
  })

  test('default descriptor', () => {
    function testDefaultDescriptor(descriptor) {
      expect(descriptor.__isProperty__).toBe(true)
      expect(descriptor.name).toBe('firstName')
      expect(descriptor.type.name).toBe('string')
      expect(descriptor.caption).toBe('First Name')
      expect(descriptor.tooltip).toBeUndefined()
    }

    const descriptor = createProperty('firstName')
    const descriptor2 = createProperty({
      name: 'firstName',
      type: 'string'
    })

    testDefaultDescriptor(descriptor)
    testDefaultDescriptor(descriptor2)
  })

  test('custom descriptor', () => {
    const descriptor = createProperty({
      name: 'salary',
      type: {
        name: 'float',
        decimals: 2
      },
      caption: 'Net Salary',
      tooltip: 'Salary after taxes'
    })

    expect(descriptor.__isProperty__).toBe(true)
    expect(descriptor.name).toBe('salary')
    expect(descriptor.type.name).toBe('float')
    expect(descriptor.type.decimals).toBe(2)
    expect(descriptor.caption).toBe('Net Salary')
    expect(descriptor.tooltip).toBe('Salary after taxes')
  })
})
