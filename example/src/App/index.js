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
                <td>
                  <input
                    value={president.firstName}
                    onChange={this.onFirstNameChange.bind(this, president.id)}
                  />
                </td>
                <td>
                  <input
                    value={president.lastName}
                    readOnly
                  />
                </td>
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
    const resp = await Reforma.http.get('/presidents')
    const data = await resp.json()
    const presidents = data.map(r => President.create(r))
    this.setState({
      presidents: presidents
    })
  }

  async onFirstNameChange(id, evt) {
    await Reforma.http.put('/presidents/:id', {
      params: {
        id: id
      },
      data: {
        first_name: evt.target.value
      }
    })
  }
}

export default App
