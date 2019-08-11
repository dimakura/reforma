import React from 'react'
import { mount } from 'enzyme'
import Typography from '@material-ui/core/Typography'
import Loading from '../Loading'

describe('<Loading />', () => {
  test('rendering', () => {
    const loading = mount(<Loading />)

    const text = loading.find(Typography).children()
    expect(text).toHaveLength(1)
    expect(text.at(0)).toIncludeText('Loading record...')
  })
})
