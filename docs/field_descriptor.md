# FieldDescriptor

`FieldDescriptor` describes `Field` properties.

Use `createFieldDescriptor(props)` factory function to create an instance of `FieldDescriptor`:

```js
import { createFieldDescriptor } from 'reforma'

const descriptor = createFieldDescriptor({
  name: 'firstName',
  type: 'string'
})
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name`   | `String` | **Required** Name of the field. |
| `caption` | `String` | Caption of the field. |
| `tooltip` | `String` | Help text (tooltip) of the field. |
| `type` | `String` or `Object` | Type of the field. Defaults to `"string"`. Also see [Type](./type.md) on type properties. |
| `__isFieldDescriptor__` | `Boolean` | Always returns `true`. |
