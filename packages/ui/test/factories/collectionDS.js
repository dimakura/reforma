import Reforma from '@reforma/core'
import { merge } from 'lodash'
import { createType } from './type'

export function createCollectionDS(params) {
  const createParams = {
    type: createType(),
    serialRoot: 'profiles',
    url: '/profiles'
  }

  merge(createParams, params)

  return Reforma.createCollectionDS(createParams)
}
