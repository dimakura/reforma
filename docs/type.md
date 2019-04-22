# Type

`Type` defines data type of a `Property`.

Use `createType(name, props)` factory function to create an instance of `Type`.

```js
import { createType } from 'reforma'

const numericType = createType('float', {
  decimals: 2
})
```

ReformaJS recognizes primitive, composite and user-defined types.

### Properties

All types share the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `name`        | `String` | Name of the type. |
| `isPrimitive` | `Boolean` | Returns `true` for primitive types. |
| `__isType__`  | `Boolean` | Always returns `true`. |

Concrete types can define additional properties.

## Primitive types

Primitive types are self-sufficient, and their definition doesn't require other types. ReformaJS supports the following primitive types:

- `bool`
- `date`
- `float`
- `image`
- `integer`
- `string`

#### Boolean

No additional props.

#### Date

| Property | Type | Default |
|----------|------|---------|
| `format` | `String` | `"DD-MMM-YYYY hh:mm:ss"` |

#### Float

| Property | Type | Default |
|----------|------|---------|
| `decimals` | `Number` | `2` |

#### Image

No additional props.

#### Integer

No additional props.

#### String

No additional props.

## Composite types

TODO:

## User-defined types

TODO:
