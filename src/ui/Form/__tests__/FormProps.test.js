import { getSchema } from 'Test/factories'
import createFormProps from '../FormProps'

describe('FormProps', () => {
  test('createFormProps', () => {
    const schema = getSchema()
    const props = createFormProps({
      schema,
      columns: [{
        name: 'firstName',
        caption: 'Name'
      }, 'age'],
      id: 1
    })

    expect(props._isFormProps).toBe(true)
    expect(props.schema).toBe(schema)
    expect(props.columns).toHaveLength(1)
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.columns[0].caption).toBe('Name')
    expect(props.editRecordDataSource.recordDataSource.modelId).toBe('1')
  })
})
