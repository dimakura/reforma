import React from 'react'
import { RefreshAction, Toolbar, View } from '@reforma/ui'
import { Button } from '@blueprintjs/core'
import presidentDS from './presidentDS'

class PresidentView extends React.PureComponent {
  render() {
    return (
      <div style={{ padding: 16 }}>
        <Toolbar bottomMargin>
          <Button
            icon="arrow-left"
            onClick={this.backToList.bind(this)}
          >
            Back to List
          </Button>
          <RefreshAction dataSource={presidentDS} />
        </Toolbar>
        <View
          id={this.props.match.params.id}
          dataSource={presidentDS}
          fields={[{name: 'id', label: 'ID'}, 'firstName', 'lastName']}
        />
      </div>
    )
  }

  backToList() {
    this.props.history.push('/')
  }
}

export default PresidentView
