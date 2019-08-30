import React from 'react'
import Reforma from '@reforma/core'

Reforma.config.http.baseUrl = 'http://localhost:3001'

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
      return (
        <table style={{width: '100%'}} border="1">
          <tbody>
            {presidents.map(president => (
              <tr key={president.id}>
                <td>{president.id}</td>
                <td>{president.firstName}</td>
                <td>{president.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

  async componentDidMount() {
    await this.loadData()
  }

  async loadData() {
    await presidentDS.fetch()

    this.setState({
      presidents: presidentDS.data
    })
  }
}

export default App
