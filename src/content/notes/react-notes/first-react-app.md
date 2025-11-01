---
title: "First React App"
tags: ["react", "javascript", "frontend"]
date: ""
category: "React"
---

# First React App

React is a Javascript library used for building websites with reusable components. It's known for:
- JSX
- Fast and scalable
- Its efficiency

**Hot reloading** is a feature in React that allows developers to instantly see changes made to their code in real time. The output gets updated with every character we type in the code editor.

## File structure

Typically, a React app would contain several files. The index.html file is the root of the React app (kinda like the main function in Python). It features a single element with an id of "root"

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
This element is then selected inside the index.js file to actually render the website. This is how our HTML and React code is connected.
```
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(<App />);

```

Importing React from "react" library allows us to use something called JavaScript Syntax Extension (JSX for short). This allows us to write HTML inside of JavaScript.

Components are functions that return JSX content. If JSX is the "language" then components are the "building blocks" of the website's interface.  Let's take a look:
```
import React from "react";

export default function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}
```
- We imported React to be able to use JSX and write components
- Component is the function that returns something
- We must return something that is wrapped in a single elements (like a div or <>)
- `export default` lets us use the component in other files like so:
 ```
 import Greetings from "path/to/HelloWorld.js";

export default function App() {
  return <HelloWorld />
}
 ```
