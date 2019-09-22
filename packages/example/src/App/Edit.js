import React from 'react'
import { Form } from '@reforma/ui'
import presidentDS from './presidentDS'

class Edit extends React.PureComponent {
  render() {
    const id = this.props.match.params.id

    return (
      <div style={{ padding: 16 }}>
        <Form
          id={id}
          dataSource={presidentDS}
          fields={[{name: 'id', label: 'ID', readOnly: true}, 'firstName', 'lastName']}
        />
      </div>
    )
  }
}

export default Edit
