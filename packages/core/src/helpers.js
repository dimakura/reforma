import { snakeCase as lodashSnakeCase } from 'lodash'

/**
 * This `snakeCase` preserves leading and trailing `_`s,
 * when compared to lodash's `snakeCase`.
 */
export function snakeCase(string) {
  return do {
    if (typeof string === 'string') {
      string.split('_').map(lodashSnakeCase).join('_')
    } else {
      null
    }
  }
}
