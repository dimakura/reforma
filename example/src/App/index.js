import React from 'react'
import Reforma from '@reforma/core'
import { Button, FocusStyleManager, HTMLTable } from '@blueprintjs/core'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

Reforma.config.http.baseUrl = 'http://localhost:3001'
FocusStyleManager.onlyShowFocusOnTabs()

const President = Reforma.createType({
  name: 'President',
  fields: {
    id: Reforma.integer.id,
    firstName: Reforma.string,
    lastName: Reforma.string,
    fullName: Reforma.string.calc((record) => {
      return [record.firstName, record.lastName].filter(n => !!n).join(' ')
    })
  }
})

const presidentDS = Reforma.createCollectionDS({
  type: President,
  url: '/presidents'
})

class App extends React.PureComponent {
  render() {
    const presidents = this.state && this.state.presidents

    if (presidents == null) {
      return 'No data'
    } else {
      const page = this.state.page
      const total = this.state.total
      const pages = Math.ceil(total/5)

      const pageEls = []
      for (let i = 0; i < pages; i++) {
        const p = i + 1

        pageEls.push(
          <Button
            key={`page-${p}`}
            minimal
            onClick={this.onChangePage.bind(this, p)}
            active={p === page}
          >
            {p}
          </Button>
        )
      }

      return (
        <div>
          <Button intent="success" onClick={this.onRefresh.bind(this)}>
            Refresh
          </Button>

          <HTMLTable
            bordered
            condensed
            interactive
            style={{ width: '100%' }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {presidents.map(president => (
                <tr key={president.id}>
                  <td>{president.id}</td>
                  <td>{president.firstName}</td>
                  <td>{president.lastName}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>

          <div>
            {pageEls}
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    this.loadData({
      _page: 1,
      _limit: 5
    })
  }

  onRefresh() {
    this.loadData(presidentDS.params)
  }

  onChangePage(page) {
    this.loadData({
      ...presidentDS.params,
      _page: page
    })
  }

  async loadData(params) {
    await presidentDS.fetch(params)

    this.setState({
      presidents: presidentDS.data,
      page: params._page,
      total: presidentDS.headers.get('X-Total-Count')
    })
  }
}

export default App
