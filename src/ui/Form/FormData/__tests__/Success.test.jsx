import React from 'react'
import { mount } from 'enzyme'
import Typography from '@material-ui/core/Typography'
import Success from '../Success'

describe('<Success />', () => {
  test('rendering', () => {
    const success = mount(<Success />)
    const text = success.find(Typography).children()

    expect(text).toHaveLength(1)
    expect(text.at(0)).toIncludeText('Record saved.')
  })
})
