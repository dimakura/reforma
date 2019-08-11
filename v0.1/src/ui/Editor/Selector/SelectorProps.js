import { get } from 'lodash'
import isPresent from 'reforma/utils/isPresent'

export default function createSelectorProps(data) {
  const dataSource = get(data, 'dataSource')
  const modalTitle = get(data, 'modalTitle', 'Select Object')
  const searchText = get(data, 'searchText', 'Search...')
  const displayProperty = get(data, 'displayProperty', 'toString')

  return {
    get _isSelectorProps() {
      return true
    },

    get dataSource() {
      return dataSource
    },

    get modalTitle() {
      return modalTitle
    },

    get searchText() {
      return searchText
    },

    get displayProperty() {
      return displayProperty
    },

    formatValue(model) {
      return do {
        if (isPresent(model)) {
          if (
            typeof model === 'object' &&
            displayProperty in model
          ) {
            if (typeof model[displayProperty] === 'function') {
              model[displayProperty].apply(model)
            } else {
              model[displayProperty].toString()
            }
          } else {
            model.toString()
          }
        } else {
          '(empty)'
        }
      }
    }
  }
}
