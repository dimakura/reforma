import { createSchema } from 'reforma'

export function getSchema() {
  return createSchema({
    name: 'profiles',
    url: '/profiles',
    fields: [
      'id',
      'firstName',
      'lastName',
      'fullName'
    ]
  })
}
