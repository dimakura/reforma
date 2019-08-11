import React from 'react'
import { mount } from 'enzyme'
import Typography from '@material-ui/core/Typography'
import Fetching from '../Fetching'

describe('<Fetching />', () => {
  test('rendering', () => {
    const fetching = mount(<Fetching />)

    const text = fetching.find(Typography).children()
    expect(text).toHaveLength(1)
    expect(text.at(0)).toIncludeText('Loading record...')
  })
})
