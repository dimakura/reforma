import React from 'react'
import editorProps from './editorProps'
import TextEditor from './TextEditor'
import Selector from './Selector'
import BoolEditor from './BoolEditor'
import NumberEditor from './NumberEditor'

class Editor extends React.PureComponent {
  render() {
    const { column } = this.props
    const fieldType = column.field.type
    const fieldTypeName = fieldType.name

    return do {
      if (fieldTypeName === 'string') {
        <TextEditor {...this.props} />
      } else if (fieldTypeName === 'Schema') {
        <Selector {...this.props} />
      } else if (fieldTypeName === 'bool') {
        <BoolEditor {...this.props} />
      } else if (fieldTypeName === 'number') {
        <NumberEditor {...this.props} />
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
