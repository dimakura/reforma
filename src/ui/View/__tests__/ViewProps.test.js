import { getSchema } from 'Test/factories'
import createViewProps from '../ViewProps'

describe('ViewProps', () => {
  test('createViewProps', () => {
    const schema = getSchema()
    const props = createViewProps({
      schema,
      columns: [{
        name: 'firstName',
        caption: 'Name'
      }, 'age'],
      id: 1
    })

    expect(props.schema).toBe(schema)
    expect(props._isViewProps).toBe(true)
    expect(props.columns).toHaveLength(1)
    expect(props.columns[0].field.name).toBe('firstName')
    expect(props.columns[0].caption).toBe('Name')
    expect(props.recordDataSource.modelId).toBe('1')
  })
})
