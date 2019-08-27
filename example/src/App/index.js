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
    return (
      <h1>Hello world!</h1>
    )
  }

  async componentDidMount() {
    const resp = await Reforma.http.get('/presidents')
    const data = await resp.json()
    const presidents = data.map(r => President.create(r))
    console.log(presidents)
  }
}

export default App
