import { merge } from 'lodash'

export default function defaultPageMover(dataSource, page) {
  const params = merge({}, dataSource.params, { _page: page })
  dataSource.fetch(params)
}
