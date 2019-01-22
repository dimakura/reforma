import createViewProps from 'reforma/ui/View/ViewProps'
import { getSchema } from './schema'

export function getViewProps() {
  const schema = getSchema()

  const viewProps = createViewProps({
    schema,
    columns: ['firstName', 'lastName'],
    id: 1
  })

  return viewProps
}
