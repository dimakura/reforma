import React from 'react'
import { mount } from 'enzyme'
import { getColumn } from 'Test/factories'
import Editor from '../index'
import TextEditor from '../TextEditor'

describe('<Editor />', () => {
  const column = getColumn()
  const onChange = jest.fn()

  test('TextEditor', () => {
    const editor = mount(<Editor
      column={column}
      value="Dimitri"
      onChange={onChange}
    />)

    const textEditor = editor.find(TextEditor)
    expect(textEditor).toHaveLength(1)
  })
})
