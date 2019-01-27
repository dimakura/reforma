import React from 'react'
import { mount } from 'enzyme'
import TextField from '@material-ui/core/TextField'
import { getColumn } from 'Test/factories'
import TextEditor from '../TextEditor'

describe('TextEditor',  () => {
  const column = getColumn()
  const onChange = jest.fn()

  test('rendering value', () => {
    const editor = mount(<TextEditor
      column={column}
      value="Dimitri"
      onChange={onChange}
    />)

    const textField = editor.find(TextField)
    const props = textField.props()

    expect(props.label).toBe('First Name')
    expect(props.value).toBe('Dimitri')
    expect(props.error).toBe(false)
    expect(props.helperText).toBeUndefined()
  })

  test('rendering error', () => {
    const editor = mount(<TextEditor
      column={column}
      value="Dimitri"
      error="name required"
      onChange={onChange}
    />)

    const textField = editor.find(TextField)
    const props = textField.props()

    expect(props.label).toBe('First Name')
    expect(props.value).toBe('Dimitri')
    expect(props.error).toBe(true)
    expect(props.helperText).toBe('name required')
  })

  test('chaning value', () => {
    const editor = mount(<TextEditor
      column={column}
      value="Dimitri"
      onChange={onChange}
    />)

    const input = editor.find('input')
    input.simulate('change', {
      target: {
        value: 'Dimitri'
      }
    })
    expect(onChange).toHaveBeenCalledWith(column.field, 'Dimitri')
  })
})
