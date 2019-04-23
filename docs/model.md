# Model

`Model` describes application entity.

Use `createModel(props)` factory function to create a `Model`.

```js
import { createModel, createProperty } from 'reforma'

const model = createModel({
  name: 'User',
  properties: [
    createProperty('firstName'),
    createProperty('lastName')
  ]
})
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name`   | `String` | **Required** Name of the model. |
| `properties` | `Array` | **Required** Model properties. See [Property](./property.md). |
| `isSingleton` | `Boolean` | If the model is singleton. |
| `__isModel__` | `Boolean` | Always returns `true`. |
