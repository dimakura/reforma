# Property

`Property` belongs to `Model`.

Use `createProperty(props)` factory function to create an instance of `Property`:

```js
import { createProperty } from 'reforma'

const property = createProperty({
  name: 'firstName',
  type: 'string'
})

// or

const theSameProperty = createProperty('firstName')
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name`   | `String` | **Required** Name of the field. |
| `caption` | `String` | Caption of the field. Defaults to humanized name. |
| `tooltip` | `String` | Help text (tooltip) of the field. |
| `type` | `String` or `Object` | Type of the field. Defaults to `"string"`. Also see [Type](./type.md) on type properties. |
| `__isProperty__` | `Boolean` | Always returns `true`. |
