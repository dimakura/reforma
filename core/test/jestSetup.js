import { __cleanupTypes__ } from '@reforma/core/type'
import { __cleanupConfig__ } from '@reforma/core/config'

afterEach(() => {
  __cleanupTypes__()
  __cleanupConfig__()
})
