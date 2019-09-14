import React from 'react'
import ReactDOM from 'react-dom'
import Reforma from '@reforma/core'
import { FocusStyleManager } from '@blueprintjs/core'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@reforma/ui/lib/css/reforma.css'

import App from './App'

Reforma.config.http.baseUrl = 'http://localhost:3001'
FocusStyleManager.onlyShowFocusOnTabs()

ReactDOM.render(<App />, document.getElementById('root'))
