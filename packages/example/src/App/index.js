import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import List from './List'
import View from './View'

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/presidents/:id" component={View} />
        </Switch>
      </Router>
    )
  }
}

export default App
