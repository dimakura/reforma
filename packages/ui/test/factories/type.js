import Reforma from '@reforma/core'

export function createType() {
  return Reforma.createType({
    name: 'Profile',
    fields: {
      id: Reforma.integer.id,
      firstName: Reforma.string,
      lastName: Reforma.string
    }
  })
}
