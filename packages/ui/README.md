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

TODO: this became a generic `DataSourceComponent`

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
  render: (model) => (<FancyComponent value={model.fullName} />),
  width: 100,
  className: 'full-name-class'
  style: {
    textAlign: 'center'
  }
}
```

#### Rendering (`as`) option

One more option for the columns specification, not shown in the last example, is the rendering (`as`) option. The rendering option tells Reforma how we want to render the cell.

- `string`, renders as one-liner.
- `text`, renders as a multi-line text.
- `tag`, renders text as a tag. You can also specify intent e.g. `tag:primary`.
- `number`, renders as a number (within `<code>` tag). You can also specify precision of the number, e.g. `number:2` will render number with `2` digits after the comma.
- `date`, renders date in `MM/dd/yyyy HH:mm` format. You can also specify `date:short` (for `MM/dd/yyyy`) and `date:long` (for `MM/dd/yyyy HH:mm:ss`), or define your own format `date:format-string`.
- `array`, for rendering array values. You can also specify element format, e.g. `array:number:2`.

### Other collection components

- `RefreshAction` renders as a button which re-fetches underlying collection data source when clicked;
- `Pagination` renders pagination component;
- `Error` renders errors.

In the following example, all components hare the same collection data source:

```js
import { Error, Pagination, RefreshAction, Table, Toolbar } from '@reforma/ui'

<div>
  <Toolbar marginBottom>
    <RefreshAction dataSource={profilesDS} />
  </Toolbar>
  <Error marginBottom dataSource={profilesDS} />
  <Table
    columns={['id', 'firstName', 'lastName']}
    dataSource={profilesDS}
  />
  <Toolbar topMargin>
    <Pagination dataSource={profilesDS} />
  </Toolbar>
</div>
```

#### `RefreshAction` props

| Property | Default | Discussion |
| :------- | :------ | :--------- |
| `dataSource` | `null` | Collection data source for this component. This property is required. |
| `icon` | `"refresh"` | Button icon. |
| `text` | `"Refresh"` | Button text. |
| `large` | `false` | Display as a large button. |
| `minimal` | `false` | Display as a minimal button. |

#### `Pagination` props

| Property | Default | Discussion |
| :------- | :------ | :--------- |
| `dataSource` | `null` | Collection data source for this component. This property is required. |
| `pageExtractor` | `defaultPageExtractor` | Function which given `dataSource`, returns object containing keys: `limit`, `total`, `page`, `pages`. |
| `pageMover` | `defaultPageMover` | Function which given `dataSource` and `page`, fetches given page on the data source. |
