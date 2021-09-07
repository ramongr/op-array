<details>
  <summary>findBy</summary>

  ```javascript
    const collection = [
      {id: 1, user: { name: 'Foo' }},
      {id: 2, user: { name: 'Bar' }}
    ]

    collection.findBy('id', 1) // Returns {id: 1, user: { name: 'Foo }}

    collection.findBy('user.name', 'Bar') //Returns {id: 2, user: { name: 'Bar' }}
  ```

</details>

<details>
  <summary>findById</summary>

  ```javascript
    const collection = [
      {id: 1, user: { name: 'Foo' }},
      {id: 2, user: { name: 'Bar' }}
    ]

    collection.findById(1) // Returns {id: 1, user: { name: 'Foo }}
  ```

</details>

<details>
  <summary>where</summary>

  ```javascript
    const collection = [
      {id: 1, user: { name: 'Foo' }},
      {id: 2, user: { name: 'Bar' }},
      {id: 3, user: { name: 'Bar' }}
    ]

    collection.where('id', 1) // Returns [{id: 1, user: { name: 'Foo }}]

    collection.where('user.name', 'Bar') // Returns [{id: 2, user: { name: 'Bar' }}, {id: 3, user: { name: 'Bar' }}]
  ```

</details>

<details>
  <summary>extract</summary>

  ```javascript
    const collection = [
      {id: 1, user: { name: 'Foo' }},
      {id: 2, user: { name: 'Bar' }},
      {id: 3, user: { name: 'Bar' }}
    ]

    collection.extract(['id']) // Returns [{id: 1}, {id: 2}, {id: 3}]

    collection.where(['id', 'test']) // Returns [{id: 1, test: undefined}, {id: 2, test: undefined}, {id: 3, test: undefined}]
  ```

</details>