export const config = require('./config').default
export const createSchema = require('./schema').default

// XXX: do we need to export this? Probably no!
export const createField = require('./schema/Field').default
export const createFieldType = require('./schema/FieldType').default
