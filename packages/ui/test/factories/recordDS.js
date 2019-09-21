import Reforma from '@reforma/core'
import { merge } from 'lodash'
import { createType } from './type'

export function createRecordDS(params) {
  const createParams = {
    type: createType(),
    serialRoot: 'profile',
    url: '/profiles'
  }

  merge(createParams, params)

  return Reforma.createRecordDS(createParams)
}
