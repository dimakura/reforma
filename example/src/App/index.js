import React from 'react'
import Reforma from '@reforma/core'
import { Table } from '@reforma/ui'
import { FocusStyleManager } from '@blueprintjs/core'

import 'normalize.css/normalize.css'
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

const presidentsDS = Reforma.createCollectionDS({
  type: President,
  url: '/presidents'
})

class App extends React.PureComponent {
  render() {
    return (
      <Table
        dataSource={presidentsDS}
        columns={[{
          name: 'id',
          header: 'N',
          width: 50,
          align: 'right'
        }, 'firstName', 'lastName']}
        style={{ width: '100%' }}
        initialParams={{_page: 1, _limit: 5}}
      />
    )
  }
}

export default App
