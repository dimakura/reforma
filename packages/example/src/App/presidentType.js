import Reforma from '@reforma/core'

export default Reforma.createType({
  name: 'President',
  fields: {
    id: Reforma.integer.id,
    firstName: Reforma.string,
    lastName: Reforma.string,
    fullName: Reforma.string.calc((record) => {
      return [record.firstName, record.lastName].filter(n => !!n).join(' ')
    })
  }
})
