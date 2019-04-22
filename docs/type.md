# Type

`Type` is an interface with the following basic properties:

| Property | Description |
|----------|-------------|
| `__isType__`  | This should always be `true`. |
| `isPrimitive` | Should be `true` for primitive types. |
| `name`        | Name of the type.

Concrete types may have additional properties.

To create a new `Type` use `createType` generator:

```js
import { createType } from 'reforma'

const priceType = createType('float', {
  decimals: 2
})
```

### Primitive types

Primitive types are self-sufficient and their definition doesn't require other types.

#### String

| Property | Description |
|----------|-------------|
| ``


#### Text

#### Boolean

#### Date

#### Float

#### Integer

#### Image

### Complex types
