# Positional

```ts
import { first, second, third, last } from 'op-array/positional';
```

Each returns `T | undefined` so empty-array handling is surfaced at the
type level.

```ts
first([10, 20, 30]);  // 10
second([10, 20, 30]); // 20
third([10, 20, 30]);  // 30
last([10, 20, 30]);   // 30

first([]);            // undefined
last([10]);           // 10
```
