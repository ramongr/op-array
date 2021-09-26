<details>
  <summary>unique</summary>

  ```javascript
    const collection = [1, 2, 2, 3, 4]

    collection.unique() // Returns [1, 2, 3, 4]
  ```

</details>

<details>
  <summary>flat</summary>

  ```javascript
    const collection = [[1, 2], [2, 3, 4]]

    collection.flat() // Returns [1, 2, 2, 3, 4]
  ```

</details>

<details>
  <summary>inGroups</summary>

  ```javascript
    const collection = const collection = [1, 2, 2, 3, 4, 5, 6]
    collection.inGroups() // Returns [ [ 1, 2, 2 ], [ 3, 4, 5 ], [ 6 ] ]
  ```

  ```javascript
    const collection = [1, 2, 2, 3, 4, 5]
    collection.inGroups() // Returns [ [ 1, 2 ], [ 2, 3 ], [ 4, 5 ] ]
  ```

</details>

<details>
  <summary>occurences</summary>

  ```javascript
    const collection = [1, 2, 2, 3, 4, 5, 6]
    collection.occurences() // Returns [ [ 1, 2, 2 ], [ 3, 4, 5 ], [ 6 ] ]
  ```

  ```javascript
    const collection = [1, 2, 2, 3, 3, 3, 4, 4, 5]
    collection.occurences() // Returns [ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 2 ], [ 5, 1 ] ]
  ```

</details>

<details>
  <summary>compact</summary>

  ```javascript
    const collection = [1, 2, null, 3, undefined, 4, '', 5]
    collection.compact() // Returns [ 1, 2, 3, 4, 5 ]
  ```

</details>

<details>
  <summary>zip</summary>

  ```javascript
    const collection = [1, 2, 3]
    collection.zip([4,5,6]) // Returns [ 1, 2, 3, 4, 5, 6 ]
  ```

</details>