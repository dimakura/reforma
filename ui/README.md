# Reforma UI

Reforma UI is a widget library based on [Reforma Core](https://github.com/dimakura/reforma/tree/master/core). Widgets are built on top of the popular [Blueprint](https://blueprintjs.com) library.

## Installation

Install Reforma Core and UI, and Blueprint:

```sh
$ npm i @reforma/core @reforma/ui @blueprintjs/core
```

Don't forget to import Blueprint styles in your app:

```js
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
```

## Collection data source components

### `CollectionDSComponent`

`CollectionDSComponent` is a generic collection data source component. All other collection data source components in Reforma UI are based on `CollectionDSComponent`. You can use `CollectionDSComponent` to implement your own

```js
import { CollectionDSComponent } from '@reforma/ui'

<CollectionDSComponent
  autofetch
  cached
  dataSource={profilesDS}
  render=((props) => {
    // render component
  })
/>
```

| Property | Default | Discussion |
| :------- | :------ | :--------- |
| `autofetch` | `false` | When `true`, this component will try to fetch the `dataSource` initial state. |
| `cached` | `true` | When `true`, this component will try to reuse existing data in the `dataSource`. |
| `dataSource` | `null` | Collection data source for this component. This property is required.
| `render` | `null` | Function which renders the component. This property is required.

### `Table`

`Table` displays data in tabular form:

```js
import { Table } from '@reforma/ui'

<Table
  autofetch
  cached
  columns={['id', 'firstName', 'lastName']}
  dataSource={profilesDS}
/>
```

| Property | Default | Discussion |
| :------- | :------ | :--------- |
| `autofetch` | `true` | When `true`, this component will try to fetch the `dataSource` initial state. |
| `cached` | `true` | When `true`, this component will try to reuse existing data in the `dataSource`. |
| `dataSource` | `null` | Collection data source for this component. This property is required.
| `columns` | `null` | Array of columns for the given table. This property is required.

Table columns can be given as property names or as a full column qualifiers:

```js
const column = {
  name: 'fullName',
  header: 'Painter Name',
  renderCell: (model) => (<span>{model.fullName}</span>)
}
```
