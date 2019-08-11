import { getSchema } from 'Test/factories'
import createFormProps from '../FormProps'

describe('FormProps', () => {
  test('createFormProps', () => {
    const schema = getSchema()
    const onSuccess = jest.fn()
    const onCancel = jest.fn()
    const props = createFormProps({
      schema,
      columns: [{
        name: 'firstName',
        caption: 'Name'
      }, 'age'],
      id: 1,
      saveText: 'Update Profile',
      cancelText: 'Cancel',
      onSuccess,
      onCancel
    })

    expect(props._isFormProps).toBe(true)
    expect(props.schema).toBe(schema)
    expect(props.columns).toHaveLength(1)
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.columns[0].caption).toBe('Name')
    expect(props.editRecordDataSource.recordDataSource.modelId).toBe('1')
    expect(props.saveText).toBe('Update Profile')
    expect(props.cancelText).toBe('Cancel')
    expect(props.onSuccess).toBe(onSuccess)
    expect(props.onCancel).toBe(onCancel)
  })
})
