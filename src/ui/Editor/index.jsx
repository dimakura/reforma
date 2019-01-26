import React from 'react'
import editorProps from './editorProps'
import TextEditor from './TextEditor'

class Editor extends React.PureComponent {
  render() {
    const { column } = this.props
    const fieldType = column.field.type
    const fieldTypeName = fieldType.name

    return do {
      if (fieldTypeName === 'string') {
        <TextEditor {...this.props} />
      } else {
        <div style={{ color: 'red' }}>
          Editor not implemented: <strong>{fieldTypeName}</strong>
        </div>
      }
    }
  }
}

Editor.propTypes = editorProps

export default Editor
