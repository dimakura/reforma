# Reforma

Reforma will help you to quickly integrate your remote data with React UI.

## Config

At this stage Reforma only supports global static configuration.
You can configure baseUrl (for API) and HTTP headers.

```js
import { config } from 'reforma'

config.setBaseUrl('https://myapi.server/api/')
config.setRequestHeader('authorization', myToken)
// or
config.setRequestHeaders({
  authorization: myToken,
  application: 'admin'
})
```

## Model

Using models is not necessary with Reforma. But models provide a way to wrap calculated properties and business logic into a convenient place.

Imagine you have the following `Profile` model:

```js
class Profile {
  constructor(id, firstName, lastName, age) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  get fullName() {
    return [this.firstName, this.lastName].join(' ')
  }
}
```

The model above is not exactly what Reforma can work with. Reforma assumes you create your models using generator functions. In case you prefer using classes, you will need to wrap your model creation into generator function.

For the previous example, the wrapper might look like below:

```js
import { get } from 'lodash'

// Note, that Reforma can pass `null` into `data` attribute!!
function createProfile(data) {
  const id = get(data, 'id')
  const firstName = get(data, 'firstName')
  const lastName = get(data, 'lastName')
  const age = get(data, 'age')

  return new Profile(id, firstName, lastName, age)
}
```

## Schema

Schema describes the data Reforma works with.

Continuing with our example:

```js
import { createSchema } from 'reforma'

const profileSchema = createSchema({
  name: 'Profile',
  fields: ['firstName', 'lastName', 'age'],
  generator: createProfile, // you can omit this, if you don't need models
  url: 'profiles' // by default, schema name will be used as an URL
})
```

## UI

Once schema is ready, you can create your UI elements.

```js
import {
  Table, // to display collection of data
  View, // to display single record
  Form // to edit/create new records
} from 'reforma'

<Table
  schema={profileSchema}
  perPage={10}
  withSearchField
  withPagination
/>

<View
  schema={profileSchema}
  id={1}
/>

<Form
  schema={profileSchema}
  id={1} // or omit this for a new record
  onEditCompleted={doSomething}
/>
```

Yes, it's that's simple!

## Advanced fields

Reforma supports advanced field options.

TODO:

## Backend format

TODO:
