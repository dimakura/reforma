# Reforma

Reforma (from React+Form) is a framework which will help you to create rich UI forms. Reforma is especially suited for creating Admin panels, and pages with heavy data processing. It will save you a lot of time, which you will hopefully spend wisely.

In theory Reforma can also be used in end-user facing applications, where data intensity is not that high. But keep in mind, that in such scenario Reforma will save you less time, and you should consider whether constraints implied by Reforma suit you well.

## About the core module

The core module (`@reforma/core`) defines the basic abstractions. The core module is not dependent on any UI-widgets library. Reforma provides an official UI implementation `@reforma/blueprint`, which is based on [Blueprint](https://blueprintjs.com) widget library. But Reforma can be implemented using other widget libraries as well.

## Reforma types

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

and define fields later:

```js
profileType.defineFields({
  id: Reforma.integer.id,
  firstName: Reforma.string,
  lastName: Reforma.string,
  fullName: Reforma.string.calc((self) => {
    return `${self.firstName} ${self.lastName}`
  })
})
```

You can use `defineFields` only once for a user defined type without fields.

You can also put user defined types as field types:

```js
const orderType = Reforma.createType({
  name: 'Order'
})

orderType.defineFields({
  profile: profileType,
  total: Reforma.float.greaterThan(0)
})
```

Because we can split type creation into two parts (declaration and field definition), it's possible to have circular references of user defined types.

### Distinction from fields

In Reforma types are reusable. That means that we have only one `Reforma.integer` and `Reforma.createType` can produce single user defined type per name. When we use `id`, `validate`, or `calc` on the built-in types, they are implicitly converted into a field object. This conversion can be explicit, using `toField` getter on any type:

```js
Reforma.integer.__isType__
// => true

Reforma.integer.presence.__isField__
// => true

Reforma.integer.toField.__isField__
// => true
```

User defined types cannot be converted to field implicitly. When needed, this conversion should be explicit using `toField` getter.

```js
profileType.__isType__
// => true

profileType.toField.__isField__
// => true
```

## Instantiating Reforma types

Every Reforma type can be instantiated using `create` method defined on the type itself.

Built-in Reforma types are a good point to start:

```js
Reforma.integer.create(1)
// => 1

Reforma.integer.create('2')
// => 2

Reforma.integer.create({value: 1})
// => null
```

User defined types also provide `create` method:

```js
const profileInstance = profileType.create({
  id: 1,
  firstName: 'Amerigo',
  lastName: 'Vespucci'
})

profileInstance.id
// => 1

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

## Validation

Reforma provides built-in validators:

```js
const integerField = Reforma.integer.presence().greaterThan(0, { allowBlank: true })

integerField.getErrors(null)
// => ['can\'t be empty']

integerField.getErrors(0)
// => ['should be greater than 0']
```

There are more build-in validators:

- `.presence()`
- `.greaterThan(number)`
- `.greaterOrEqualTo(number)`
- `.lessThan(number)`
- `.lessOrEqualTo(number)`
- `.inclusion(array)`

Programmer can also specify custom validators:

```js
const anotherField = Reforma.integer.validate((value, field) => {
  if (value === 0) {
    return 'Zero is not acceptable!'
  }
})

anotherField.getErrors(0)
// => ['Zero is not acceptable!']
```

Field validations are aggregated under respective fields when you use `getErrors` method on an instance of the user defined type:

```js
const profileType = Reforma.createType({
  name: 'Profile',
  fields: {
    id: Reforma.integer.id,
    firstName: Reforma.string.presence(),
    lastName: Reforma.string.presence()
  }
})

const profile = profileType.create({ id: 1 })

profile.getErrors()
// => {
//   firstName: ['can\'t be empty'],
//   lastName: ['can\'t be empty']
// }
```

You can also define type-wide validation for user defined type. Note that type-wide validations affect the user defined type itself. There are not type-wide validation for a primitive type. Type-wide validators aggregate under `__base__` key:

```js
profileType.validate((profile, type) => {
  if (profile.firstName === profile.lastName) {
    return 'First and last names should be different'
  }
})

profileType.create({}).getErrors()
// => {
//   __base__: ['First and last names should be different'],
//   firstName: ['can\'t be empty'],
//   lastName: ['can\'t be empty']
// }
```

Note: in case you need to return several errors from a validation function, return them as an array.

When there is a type mismatch between validated field and the value provided, a special ("type mismatch") object is returned from the validation:

```js
integerField.validate('x').isTypeMismatch
// => true
```

## Serialization

At this stage Reforma supports only JSON serialization/deserialization.

```js
Reforma.integer.serialize(1)
// => 1

profileType.serialize({id: 1, firstName: 'Amerigo', lastName: 'Vespucci'})
// => {id: 1, first_name: 'Amerigo', last_name: 'Vespucci'}
```

By default serialized field names will be snake_cased.

Deserialization is equally simple:

```js
profileType.deserialize({
  id: 1,
  first_name: 'Amerigo',
  last_name: 'Vespucci'
})
// => {id: 1, firstName: 'Amerigo', lastName: 'Vespucci'}
```

You can also alter the way how serialization/deserialization works for user defined types using `serialMap` property:

```js
const profileType = Reforma.createType({
  name: 'Profie',
  fields: {...},
  serialMap: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'last',
    fullName: true
  }
})

profileType.serialize({id: 1, firstName: 'Amerigo', lastName: 'Vespucci'})
// => {id: 1, firstName: 'Amerigo', last: 'Vespucci', full_name: 'Amerigo Vespucci'}
```

By default calculated fields are not serialized. But as the example above shows, by putting them into `serialMap` we can get calculated fields in resulting JSON.

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

TODO: listeners

### HTTP methods

Besides operations described above, every datasource exposes methods related to HTTP:

```js
datasource.httpGet(url, params)
datasource.httpPost(url, data)
datasource.httpPut(url, data)
datasource.httpDelete(url, params)
```

These methods might be useful when defining actions on datasources.

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
