---
title: "React Hooks Basics"
tags: ["react", "javascript", "frontend"]
date: "2024-01-15"
category: "React"
---

# React Hooks Basics

## useState
Manages component state. Returns current state and setter function.

```javascript
const [count, setCount] = useState(0);
```

## useEffect
Handles side effects like API calls, subscriptions, timers.

```javascript
useEffect(() => {
  // Side effect
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## useContext
Shares data without prop drilling.

```javascript
const value = useContext(MyContext);
```

## useReducer
Complex state management with actions.

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

## useMemo
Memoizes expensive calculations.

```javascript
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## useCallback
Memoizes functions to prevent unnecessary re-renders.

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```
