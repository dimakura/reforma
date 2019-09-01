import Reforma from '@reforma/core'
import President from './presidentType'

export default Reforma.createCollectionDS({
  type: President,
  url: '/presidents'
})
