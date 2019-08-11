import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import createViewProps from './ViewProps'
import View from './View'

class ViewRoot extends React.PureComponent {
  render() {
    const data = pick(this.props, [
      'schema',
      'columns',
      'record',
      'id'
    ])

    const viewProps = createViewProps(data)

    return <View {...viewProps} />
  }
}

ViewRoot.propTypes = {
  schema: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
}

export default ViewRoot
