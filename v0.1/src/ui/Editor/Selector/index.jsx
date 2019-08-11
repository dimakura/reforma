import React from 'react'
import { get } from 'lodash'
import SelectorComponent from './SelectorComponent'
import createSelectorProps from './SelectorProps'
import editorProps from '../editorProps'

class SelectorRoot extends React.PureComponent {
  constructor(props) {
    super(props)

    const schema = get(props, 'column.field.type.schema')

    this.state = {
      schema
    }
  }

  render() {
    const { schema } = this.state
    const selectorProps = get(this.props, 'column.editorProps', {})

    const dataSource = do {
      if (schema != null) {
        schema.dataSource.getSelectorDataSource()
      }
    }

    if (dataSource == null) {
      throw 'DataSource cannot be created!'
    }

    const props = {
      ...this.props,
      selectorProps: createSelectorProps({
        ...selectorProps,
        dataSource
      })
    }

    return <SelectorComponent {...props} />
  }
}

SelectorRoot.propTypes = editorProps

export default SelectorRoot
