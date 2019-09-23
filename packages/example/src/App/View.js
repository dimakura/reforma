import React from 'react'
import { LoadingIndicator, RefreshAction, Toolbar, View } from '@reforma/ui'
import { Link } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'
import presidentDS from './presidentDS'

class PresidentView extends React.PureComponent {
  render() {
    const id = this.props.match.params.id

    return (
      <div style={{ padding: 16 }}>
        <Toolbar bottomMargin>
          <Link to="/" className="bp3-button">
            <Icon icon="arrow-left" />
            <span className="bp3-button-text">Back to List</span>
          </Link>
          <RefreshAction dataSource={presidentDS} />
          <Link to={`/presidents/${id}/edit`} className="bp3-button">
            <Icon icon="edit" />
            <span className="bp3-button-text">Edit</span>
          </Link>
          <LoadingIndicator dataSource={presidentDS} />
        </Toolbar>
        <View
          id={id}
          dataSource={presidentDS}
          fields={[{name: 'id', label: 'ID'}, 'firstName', 'lastName']}
        />
      </div>
    )
  }
}

export default PresidentView
