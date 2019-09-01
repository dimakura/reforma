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

## Collection components

Collection components render data which they get from a collection data source.

### `CollectionComponent`

`CollectionComponent` is a generic collection component. All other collection components in Reforma UI are based on `CollectionComponent`. You can use `CollectionComponent` to implement your own components.

```js
import { CollectionComponent } from '@reforma/ui'

<CollectionComponent
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
| `dataSource` | `null` | Collection data source for this component. This property is required. |
| `initialParams` | `null` | Initial parameters for `fetch` function. Initial parameters will be used only when `autofetch=true`. |
| `render` | `null` | Function which renders the component. This property is required.

### `Table`

`Table` displays data in tabular form:

```js
import { Table } from '@reforma/ui'

<Table
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

Table columns can be given as property names or as a full column specification:

```js
const column = {
  name: 'fullName',
  header: 'Painter Name',
  render: (model) => (<span className="some-fancy-class">{model.fullName}</span>),
  width: 100,
  cellStyle: {
    textAlign: 'center'
  }
}
```

### `RefreshCollection`

`RefreshCollection` renders as a button which re-fetches underlying collection data source when clicked.

In the following example, `RefreshCollection` and `Table` share the same collection data source, which makes the `RefreshCollection` button a "refresh" button for the table.

```js
import { RefreshCollection, Table, Toolbar } from '@reforma/ui'

<div>
  <Toolbar>
    <RefreshCollection dataSource={profilesDS} />
  </Toolbar>
  <Table
    columns={['id', 'firstName', 'lastName']}
    dataSource={profilesDS}
  />
</div>
```

| Property | Default | Discussion |
| :------- | :------ | :--------- |
| `dataSource` | `null` | Collection data source for this component. This property is required. |
| `icon` | `"refresh"` | Button icon. |
| `text` | `"Refresh"` | Button text. |
| `large` | `false` | Display as a large button. |
| `minimal` | `false` | Display as a minimal button. |
