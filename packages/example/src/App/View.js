import React from 'react'
import { Toolbar } from '@reforma/ui'
import { Button } from '@blueprintjs/core'

class View extends React.PureComponent {
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
        </Toolbar>
        <p>
          TODO: view component <code>{this.props.match.url}</code>
        </p>
      </div>
    )
  }

  backToList() {
    this.props.history.push('/')
  }
}

export default View
