---
title: "Events"
tags: ["react"]
date: ""
category: "React"
---

Events are things like first loading the page, clicking something on the page, form submissions, etc.

We write code that listens for these events and trigger a reaction, also known as **event handlers**.

##### onClick event
 ```
function Example() {
  function handleClick() {
    alert("hi! you clicked me!");
  }

  return <h1 onClick={handleClick}>Click Me!</h1>;
}
 ```

example:
```
import { useState } from "react";

export default function ShoppingItem(props) {
  const [quantity, setQuantity] = useState(0);

  function handleIncrease() {
    setQuantity(quantity + 1)
  }

  function handleDecrease() {
    setQuantity(quantity - 1)
  }

  return (
    <div className="shopping-item">
      <p className="item-info">
        <strong>{props.name}</strong>
        <div className="buttons">
          <button className="btn-decrement" onClick={handleDecrease}>-</button>
          <span className="quantity">{quantity}</span>
          <button className="btn-increment" onClick={handleIncrease}>+</button>
        </div>
      </p>
    </div>
  );
}

# parent
import React from "react";
import ShoppingItem from "./ShoppingItem";

export default function App() {
  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <ShoppingItem name="🍌 bananas" />
      <ShoppingItem name="🍞 bread" />
      <ShoppingItem name="🥛 milk" />
    </div>
  );
}

```

##### Hover events
- `onMouseOver`: When a mouse/pointer _hovers over_ an element on the site.
- `onMouseLeave`: When a mouse/pointer is _no longer_ hovering over the element.
```
export default function HoverExample() {
  function handleMouseOver(e) {
    e.target.style.backgroundColor = "yellow";
  }

  function handleMouseLeave(e) {
    e.target.style.backgroundColor = "";
  }

  return <p onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>Hover over me!</p>;
}
```
