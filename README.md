[![Build Status](https://travis-ci.com/dimakura/reforma.svg?branch=master)](https://travis-ci.com/dimakura/reforma)

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
  name: 'profiles', // some unique name
  fields: ['id', 'firstName', 'lastName', 'age', 'fullName'], // list all fields from your model
  generator: createProfile, // you can omit this, if you don't use models
  url: '/profiles'
})
```

Note, that schema name should be unique for the whole project. This gives you flexibility to reuse the same model (and url) in different places of your app with different configurations.

## UI

Once schema is ready, you can create your UI elements.

```js
import {
  Table, // to display collection of data
  View, // to display single record
  Form // to edit existing or create a new record
} from 'reforma'

<Table
  schema={profileSchema}
  columns={['fullName', 'age']} // what and in what order should be displayed?
  perPage={10} // this will display paging at the bottom
  toolbar={['refresh', '|', 'search']}
/>

<View
  schema={profileSchema}
  id={1}
  columns={['firstName', 'lastName', 'age']}
  toolbar={['refresh', 'delete']}
/>

<Form
  schema={profileSchema}
  columns={['firstName', 'lastName']}
  id={1} // or omit this for a new record
  onEditCompleted={doSomething}
/>
```

Yes, it's that's simple!

## Advanced field and column options

TODO:

## Backend format

TODO:
