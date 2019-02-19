import React from 'react'
import { mount } from 'enzyme'
import { getColumn, getField } from 'Test/factories'
import NumberEditor from '../NumberEditor'

describe('NumberEditor',  () => {
  const field = getField({
    name: 'price',
    type: 'number',
    suffix: 'GEL'
  })

  const column = getColumn({ field })
  const onChange = jest.fn()

  afterEach(onChange.mockClear)

  test('renders value', () => {
    const editor = mount(<NumberEditor
      column={column}
      value="10"
      onChange={onChange}
    />)

    const textField = editor.find('TextField')
    const addorment = editor.find('InputAdornment')
    const props = textField.props()

    expect(props.label).toBe('Price')
    expect(props.value).toBe('10')
    expect(props.error).toBe(false)
    expect(props.helperText).toBeUndefined()
    expect(props.InputProps.startAdornment).toBeUndefined()
    expect(props.InputProps.endAdornment).toBeDefined()
    expect(addorment.text()).toBe('GEL')
  })
})
