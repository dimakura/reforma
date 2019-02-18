import React from 'react'
import { mount } from 'enzyme'
import { getField, getColumn } from 'Test/factories'
import BoolEditor from '../BoolEditor'

describe('BoolEditor', () => {
  const field = getField({
    name: 'isActive',
    type: 'bool'
  })

  const column = getColumn({ field })
  const onChange = jest.fn()

  afterEach(onChange.mockClear)

  test('renders value', () => {
    const editor = mount(<BoolEditor
      column={column}
      value={true}
      onChange={onChange}
    />)

    const checkbox = editor.find('Checkbox')
    const props = checkbox.props()

    expect(props.checked).toBe(true)
  })

  test('changes value', () => {
    const editor = mount(<BoolEditor
      column={column}
      value={true}
      onChange={onChange}
    />)

    const input = editor.find('input')
    const event = {
      target: {
        checked: false
      }
    }
    input.simulate('change', event)

    expect(onChange).toHaveBeenCalledWith(column.field, false)
  })
})
