import Reforma from '@reforma/core'
import { merge } from 'lodash'
import { createType } from './type'

export function createRecordDS(params) {
  const createParams = {
    type: createType(),
    serialRoot: 'profile',
    url: '/profiles/:id'
  }

  merge(createParams, params)

  return Reforma.createRecordDS(createParams)
}
