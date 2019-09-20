# Reforma

Reforma (from React+Form) is a framework which helps you create rich UI forms. Reforma is especially suited for creating admin panels, and pages with massive data processing. It will save you a lot of time which you will hopefully spend wisely.

In theory, Reforma can also be used in end-user facing applications, where data intensity is not that high. But keep in mind, that in such scenario Reforma will save you less time, and you should consider whether constraints implied by Reforma suit you well.

## About the core module

The core module (`@reforma/core`) defines the basic abstractions. The core module is not dependent on any UI-widgets library. Reforma provides the official UI implementation `@reforma/ui`, which uses [Blueprint](https://blueprintjs.com) widget library. But Reforma can be with other widget libraries as well.

## Reforma types

User-defined types (UDT) are the basis of the Reforma.

Let's build our first user-defined type:

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

As you can see, to build a user-defined type, we used a built-in types, namely `Reforma.integer` and `Reforma.string`. There are few more of them:

- `Reforma.integer`
- `Reforma.float`
- `Reforma.string`
- `Reforma.bool`
- `Reforma.datetime`
- `Reforma.arrayOf(type)`
- `Reforma.mapOf(keyType, valueType)`

There's another way to create Reforma type. First, you can "declare" the type:

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

You can use `defineFields` only once for a user-defined type without fields.

You can also put user-defined types as field types:

```js
const orderType = Reforma.createType({
  name: 'Order'
})

orderType.defineFields({
  profile: profileType,
  total: Reforma.float.greaterThan(0)
})
```

Because we can split type creation into two parts (declaration and field definition), it's possible to have circular references of user-defined types.

### Distinction from fields

In Reforma types are reusable. That means that we have only one `Reforma.integer` and `Reforma.createType` can produce a single user-defined type per name. When we use `id`, `validate`, or `calc` on the built-in types, Reforma implicitly converts them into field objects. This conversion can be explicit, using `toField` property on any type:

```js
Reforma.integer.__isType__
// => true

Reforma.integer.presence.__isField__
// => true

Reforma.integer.toField.__isField__
// => true
```

User-defined types cannot be converted to field implicitly. When needed, this conversion should be explicit using `toField` getter.

```js
profileType.__isType__
// => true

profileType.toField.__isField__
// => true
```

## Instantiating Reforma types

Every Reforma type can be instantiated using the `create` method defined on the Reforma type itself.

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

At this stage Reforma supports only JSON serialization:

```js
Reforma.integer.serialize(1)
// => 1

profileType.serialize({id: 1, firstName: 'Amerigo', lastName: 'Vespucci'})
// => {id: 1, first_name: 'Amerigo', last_name: 'Vespucci'}
```

Serialized field names will be snake_cased.

Four user-defined types you can also specify an array of serializable fields:

```js
profileType.serialize(
  {id: 1, firstName: 'Amerigo', lastName: 'Vespucci'},
  ['firstName', 'lastName']
)
// => {first_name: 'Amerigo', last_name: 'Vespucci'}
```

## Data sources

A data source is a mechanism to send and receive data from backend service. Reforma supports two kinds of data sources: collection and record.

### Collection data source

A collection data source is a data source to operate on a collection of data (of user defined types).

```js
const profilesDS = Reforma.createCollectionDS({
  type: profileType,
  serialRoot: 'profiles',
  url: '/profiles',
  params: {
    countryName: 'Italy'
  }
})
```

To retrieve data from a remote server, use the `fetch` method. You can pass params to the call:

```js
await profilesDS.fetch({
  cityName: 'Florence'
})
// GET /api/profiles?country_name=Italy&city_name=Florence

profilesDS.data
// => Array[...]

profilesDS.headers.get('X-Total-Count')
// => 100
```

Note that the params defined during data source creation (`countryName`) are present in the request, along with the params specified in the call to `fetch` (`cityName`).

There are other useful props available for a collection data source:

```js
profilesDS.data
// => Array[...]

profilesDS.headers
// => Headers{...}

profilesDS.errors
// => null

profilesDS.params
// => {countryName: "Italy", cityName: "Florence"}
```

### Record data source

Record data source is a data source to operate on a single record (of a user defined type).

```js
const profileDS = Reforma.createRecordDataSource({
  type: profileType,
  serialRoot: 'profile',
  url: '/profiles'
})
```

Now you can retrieve profile record from the server:

```js
const profile = await profileDS.fetch(1)
// or, alternatively
const profile = await profileDS.fetch({ id: 1 })
// GET /api/profiles/1
// => Profile{...}
```

Programmer can also use record data source to create or update records:

```js
const profile = await profileDS.create({
  firstName: 'Leif',
  lastName: 'Andsnes'
})
// POST /api/profiles
// => Profile{id: 100, firstName: 'Leif', lastName: 'Andsnes'}

const updatedProfile = await profileDS.update({
  lastName: 'Ove Andsnes'
})
// PUT /api/profiles/100
// => Profile{id: 100, firstName: 'Leif', lastName: 'Ove Andsnes'}
```

And he can delete given record:

```js
await profileDS.delete()
// DELETE /api/profiles/100
```

There are other useful props available for a record data source:

```js
profileDS.data
// => Profile{...}

profileDS.headers
// => Headers{}

profileDS.errors
// => null
```

### Status updates

An important property of data source (both collection and record) is its status.

```js
dataSource.status
// => "ready"
```

Possible values for the status of a data source are:

- `initial` initial status.
- `busy` status when HTTP request is active (fetching, saving, etc.).
- `ready` status after a successful request.
- `failed` status after failed request.

You can listen for status changes:

```js
const unsubscribe = dataSource.addStatusListener((oldStatus, newStatus) => ...)
```

To unsubscribe this listener, simply call `unsubscribe()` function.

## HTTP methods

HTTP/JSON are the basis for Reforma interactions with a server. Not surprisingly, Reforma offers ability to configure HTTP and use bare minimum HTTP verbs if needed.

You can set `baseUrl` and add headers for all HTTP calls in Reforma (this includes HTTP requests from datasources):

```js
Reforma.config.http.baseUrl = 'https://move4.app/api'
Reforma.config.http.setHeader('Authorization', 'my-token')
```

You can use `@reforma/core/http` for your HTTP requests, e.g. when creating actions:

```js
import http from '@reforma/core/http'

const resp = await http.get('/profiles')
resp.json()
// => [{id: 1, ...}]
```

You can cancel Reforma request by passing signals:

```js
import AbortController from 'abort-controller'

const controller = new AbortController()

http.get('/profiles', {
  signal: controller.signal
})

controller.cancel()
```
