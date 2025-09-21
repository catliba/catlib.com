---
title: "TypeScript Tips"
tags: ["typescript", "javascript", "types"]
date: "2024-01-13"
---

# TypeScript Tips

## Type Definitions

### interface vs type
- `interface` - extensible, can be merged
- `type` - more flexible, can use unions, intersections

```typescript
interface User {
  name: string;
  age: number;
}

type Status = 'loading' | 'success' | 'error';
```

### Union Types
```typescript
function process(value: string | number) {
  // Handle both types
}
```

### Optional Properties
```typescript
interface Config {
  apiUrl: string;
  timeout?: number; // Optional
}
```

### Generic Types
```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

## Utility Types

- `Partial<T>` - Makes all properties optional
- `Pick<T, K>` - Select specific properties
- `Omit<T, K>` - Exclude specific properties
- `Record<K, V>` - Object with specific key/value types

```typescript
type PartialUser = Partial<User>;
type UserName = Pick<User, 'name'>;
type UserWithoutAge = Omit<User, 'age'>;
type StringRecord = Record<string, string>;
```
