# Type

`Type` is an interface, used by the `FieldDescriptor` to determine data type served by the field. You don't usually create an instance of `Type` directly.

Internally we use `createType(name, props)` function to create `Type`:

```js
import { createType } from 'reforma/Type'

const numericType = createType('float', {
  decimals: 2
})
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name`        | `String` | Name of the type. |
| `isPrimitive` | `Boolean` | Returns `true` for primitive types. |
| `__isType__`  | `Boolean` | Always returns `true`. |

Concrete types may define additional properties.

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

## User created types

TODO:
