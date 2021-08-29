<details>
  <summary>intersection</summary>

  ```javascript
    const foo = [1, 2, 3, 4]
    const bar = [2, 3, 4]

    foo.intersection(bar) // Returns [2, 3, 4]
  ```

</details>

<details>
  <summary>exists</summary>

  ```javascript
    const foo = [1, 2, 3, 4]
    const bar = [2, 3, 4]

    foo.exists(2) // Returns true
    foo.exists(5) // Returns false
    foo.exists(bar) // Returns true
  ```

</details>

<details>
  <summary>except</summary>

  ```javascript
    const foo = [1, 2, 3, 4]

    foo.except(2) // Returns [1, 3, 4]
    foo.except([1, 2, 3]) // Returns [4]
    foo.except(5) // Returns [1, 2, 3, 4]
  ```

</details>

<details>
  <summary>union</summary>

  ```javascript
    const foo = [1, 2, 3, 4]
    const bar = [2, 3, 4, 5]

    foo.union(bar) // Returns [1, 2, 3, 4, 5]
  ```

  ```javascript
    const foo = [1, 2, 3, 4]
    const bar = [5]

    foo.union(bar) // Returns [1, 2, 3, 4, 5]
  ```

  ```javascript
    const foo = [1, 2, 3, 4]
    const bar = [1]

    foo.union(bar) // Returns [1, 2, 3, 4]
  ```

</details>
