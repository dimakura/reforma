import React from 'react'
import { mount } from 'enzyme'
import { getSchema, getColumns } from 'Test/factories'
import Data from '../Data'

describe('<FormData/Data>', () => {
  test('rendering', () => {
    const schema = getSchema()
    const columns = getColumns(schema)
    const model = {
      firstName: 'Dimitri',
      lastName: 'Kurashvili'
    }

    const dataSource = schema.dataSource.getEditRecordDataSource()
    const onChange = jest.fn()
    const onCancel = jest.fn()
    const onSubmit = jest.fn()

    const data = mount(<Data
      editRecordDataSource={dataSource}
      columns={columns}
      model={model}
      onChange={onChange}
      saveText="Create Profile"
      cancelText="Cancel"
      onCancel={onCancel}
      onSubmit={onSubmit}
    />)

    const inputs = data.find('input')
    expect(inputs).toHaveLength(2)
    expect(inputs.at(0).props().value).toBe('Dimitri')
    expect(inputs.at(1).props().value).toBe('Kurashvili')
    inputs.at(0).simulate('change')
    expect(onChange).toHaveBeenCalled()

    const buttons = data.find('button')
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0)).toIncludeText('Create Profile')
    expect(buttons.at(0).props().type).toBe('submit')
    expect(buttons.at(1)).toIncludeText('Cancel')

    buttons.at(1).simulate('click')
    expect(onCancel).toHaveBeenCalled()

    const form = data.find('form')
    form.simulate('submit')
    expect(form).toHaveLength(1)
    expect(onSubmit).toHaveBeenCalled()
  })
})
