# Reforma

Reforma (from React+Form) is a framework which will help you to create rich UI forms. Reforma is especially suited for creating Admin panels, and pages with heavy data processing. It will save you a lot of time, which you will hopefully spend wisely.

In theory Reforma can also be used in end-user facing applications, where data intensity is not that high. But keep in mind, that in such scenario Reforma will save you less time, and you should consider whether constraints implied by Reforma suit you well.

## About the core module

The core module (`@reforma/core`) defines the basic abstractions. The core module is not bound to any UI library (except React ***???***). Reforma provides an official UI implementation `@reforma/blueprint`, which is based on [Blueprint](https://blueprintjs.com) widget library. But Reforma can be easily implemented for other widget libraries as well.

## User defined types

User defined types (UDT) are the basis of the Reforma.

Let's build our first user defined type:

```js
import Reforma from '@reforma/core'

const profileType = Reforma.createType({
  name: 'Profile',
  fields: {
    id: Reforma.integer.id,
    firstName: Reforma.string,
    lastName: Reforma.string,
    fullName: Reforma.string.calc((self) => {
      return `${self.firstName} ${self.lastName}`
    })
  }
})
```

As you can see, to build a user defined type, we used a built-in types, namely `Reforma.integer` and `Reforma.string`. There are few more of them:

- `Reforma.integer`
- `Reforma.float`
- `Reforma.string`
- `Reforma.bool`
- `Reforma.datetime`
- `Reforma.arrayOf(type)`
- `Reforma.mapOf(keyType, valueType)`

There's another way to create Reforma type. First you can just "declare" the type:

```js
const profileType = Reforma.createType({
  name: 'Profile'
})
```

and add fields later:

```js
profileType.addFileds({
  id: Reforma.integer.id,
  firstName: Reforma.string,
  lastName: Reforma.string,
  fullName: Reforma.string.calc((self) => {
    return `${self.firstName} ${self.lastName}`
  })
})
```

Please note, that you can use `addFileds` method only once for a type. It's illegal to add fields several times, and it will raise exception.

You can also build more complex types, using user defined types:

```js
const orderType = Reforma.createType({
  name: 'Order'
})

orderType.addFileds({
  profile: profileType,
  total: Reforma.float.greaterThan(0)
})
```

Because we can split type declaration into two parts (declaration and field definition), it's possible to have circular references of types.

## Instantiating Reforma types

Every Reforma type can be instantiated. You might occasionally interact with Reforma instances, so it makes sense to know them closer.

Built-in Reforma types are a good point to start:

```js
const integerInstance = Reforma.integer.create(1)
integerInstance.valueOf()
// => 1

integerInstance.instanceOf(Reforma.integer)
// => true

integerInstance.isPrimitiveType
// => true

integerInstance.isUserDefinedType
// => false

integerInstance.setValue('2')
integerInstance.valueOf()
// => 2

integerInstance.setValue(null)
integerInstance.valueOf()
// => null

integerInstance.setValue({value: 1})
// => Uncaught Error: type mismatch
```

Instance of a built-in type is an object. You can get to its value using `.valueOf()` method. Instances of built-in types are mutable, and you can update their values using `setValue`.

User defined types also provide `create` method, for instantiation:

```js
const profileInstance = profileType.create({
  id: 1,
  firstName: 'Amerigo',
  lastName: 'Vespucci'
})

profileInstance.id
// => 1

profileInstance.isPrimitiveType
// => false

profileInstance.isUserDefinedType
// => true

profileInstance.firstName
// => "Amerigo"

profileInstance.lastName
// => "Vespucci"

profileInstance.fullName
// => "Amerigo Vespucci"

profileInstance.firstName = 'Christopher'
profileInstance.fullName
// => "Christopher Vespucci"
```

Instance of a user defined type is a JavaScript object. Please note, that properties of user-defined types produce pure primitive values (e.g. `profile.firstName` returns pure `String`), unlike built-in types, which come wrapped into an object.

## Validation

Reforma provides you with built-in validators:

```js
const intType = Reforma.integer.presence().greaterThan(0)
const intInstance = intType.create(null)

intInstance.isValid
// => false

intInstance.errors
// => ['you cannot leave this empty', 'should be greater than 0']
```

There are more build-in validators:

- `.presence()`
- `.greaterThan(number)`
- `.greaterOrEqualTo(number)`
- `.lessThan(number)`
- `.lessOrEqualTo(number)`
- `.inclusion(array)`

You can also define your custom validators:

```js
const intType = Reforma.integer.validate((record, value) => {
  if (value === 0) {
    record.addError('Zero is not acceptable!')
  }
})

const intInstance = intType.create(0)

intInstance.isValid
// => false

intInstance.errors
// => ['Zero is not acceptable!']
```

## Serialization

At this stage Reforma supports only JSON serialization/deserialization.

```js
intInstance.serialize()
// => 1

profileInstance.serialize()
// => {id: 1, first_name: 'Amerigo', last_name: 'Vespucci'}
```

By default Reforma names fields in user defined types, using snake-case.

To deserialize a type, provide type and raw JSON value to the `Reforma.deserialize` function:

```js
Reforma.deserialize(profileType, {
  id: 1,
  first_name: 'Amerigo',
  last_name: 'Vespucci'
})
```

You can also alter the way how serialization/deserialization works for user defined types using `serialMap` property:

```js
const profileType = Reforma.createType({
  name: 'Profie',
  fields: {...},
  serialMap: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'last'
  }
})

profileInstance.serialize()
// => {id: 1, firstName: 'Amerigo', last: 'Vespucci'}
```

## Data sources

Data source is a mechanism to send and receive data from backend service. Reforma supports two kind of data sources: collection and record.

### Collection data source

Collection data source is a data source to operate on a collection of Reforma types.

```js
const profilesDS = Reforma.createCollectionDataSource({
  type: profileType,
  serialRoot: 'profiles',
  url: '/profiles',
  params: {
    countryName: 'Italy'
  }
})
```

Now you can retrieve data using collection data source.

```js
const profiles = await profilesDS.fetch({
  cityName: 'Florence'
})
// => GET /api/profiles?country_name=Italy&city_name=Florence
```

Note that `params` property defined during data source creation is present in the request, along with the parameter values specified in `fetch()`.

### Record data source

Record data source is a data source to operate on a single Reforma type.

```js
const profileDS = Reforma.createRecordDataSource({
  type: profileType,
  serialRoot: 'profile',
  url: '/profiles'
})
```

Now you can retrieve profile record from the server.

```js
const profile = await profileDS.fetch(1)
// => GET /api/profiles/1
```

TODO: create/update/delete

### Fetching

By default datasource fetches records only once. Subsequent `fetch` calls, will return previously fetched value, even if you change params. To make data source fetch new values, pass `true` as a second parameter to `fetch`:

```js
await datasource.fetch(1)
// => {id: 1}

await datasource.fetch(2)
// => {id: 1}

await datasource.fetch(2, true)
// => {id: 2}
```

There are other useful properties of datasource you can employ:

```js
datasource.isBusy
// => true/false

datasource.status
// => idle/fetching/creating/updating/deleting/performing-actionName

datasource.isFetched
// => true/false
```

### HTTP methods

Besides operations described above, every datasource exposes methods related to HTTP:

```js
datasource.httpGet(url, params)
datasource.httpPost(url, data)
datasource.httpPut(url, data)
datasource.httpDelete(url, params)
```

This methods might be usefull when defining actions on datasources.

### Actions

You can define custom actions on datasources:

```js
datasource.defineAction('enable', async (ds) => {
  const resp = ds.httpPut('/enable-url')
  return ds.createRecord(resp)
})
```

## Configuration

```js
Reforma.config.baseUrl = '/api'
Reforma.config.setHeader('Authorization', 'my-token')
```
