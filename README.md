[![Build Status](https://travis-ci.com/dimakura/reforma.svg?branch=master)](https://travis-ci.com/dimakura/reforma)

**NOTE**: This is a development branch for v0.2!

# Reforma

Reforma is a framework for developing data-driven applications.
The central thing in Reforma is the notion of type and serialization.
Initially Reforma is going to support only JSON serialization (as frankly its easiest to implement).

Another important notion in Reforma is Procedure.
Procedure allows us to do some actions on data.
Procedures are essentially functions which operate with types defined by the user.

You can apply Reforma to many different use cases. As [ReformaUI](https://github.com/dimakura/reforma-ui) uses it to render visual elements and associated actions.

# Type

Type is the central notion in Reforma.

Reforma supports primitive, user-defined and collection types.
Types are responsible for serialization/deserialization of data.

Serialization and deserialization of data can be done through `Type` interface:

```js
import { Type } from 'reforma'

Type.serialize(myType, usableData)
Type.deserialize(myType, rawData)
```

## Primitive types

There are four primitive types supported:

- `int`
- `float`
- `bool`
- `string`

## User defined types

You can further extend types with user defined types:

```js
const userType = Type.createType('User', {
  id: 'int',
  firstName: 'string',
  lastName: 'string'
})
```

# Procedure

TODO: function calls

# Transports

TODO: JSON/HTTP
