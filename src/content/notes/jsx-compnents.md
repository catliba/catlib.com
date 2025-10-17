---
title: "JSX and Components"
tags: ["typescript", "javascript", "types"]
date: "2024-01-13"
category: "React"
---

# JSX & Components
Diving deeper into how React is written, we can add JavaScript to JSX.

```
const articleTitle = "As We May Think";
const articleAuthor = "Vannevar Bush";
const readNumber = 750;

const articleJSX = (
  <article>
    <h1>{articleTitle}</h1>
    <p>by {articleAuthor}</p>
    <p>Read by {readNumber}</p>
  </article>
)
```
Title and author are JavaScript variables but we can use curly braces to add that into our JSX variable. Anything within the curly braces must resolve to a single value.

You can also render JSX conditionally. Say a user is or is not logged in. 
```
let page = null;
let signedIn = true;

if (signedIn) {
  page = <div>User dashboard</div>
} else {
  page = <div>Sign-in page</div>
}

export default function App() {
  return (
    <div>
      {page}
    </div>
  )
}
```

Ternary operators are useful here as we can just write the code above as:
`let page = <div>{signedIn ? {/* User Dashboard */} : {/* Sign-in Page*/}}</div>`
Other conditionals we can do:
`let page = <div>signedIn && {/* User dashboard */}</div>`

#### Attributes

Consider the follow:
`const selfie = <img src="username/camera/recents/today.png" alt="a selfie" />`
The `selfie` variable contains a JSX image with two attributes, `src` and `alr`.

#### Components

**Components** are pieces of JSX that make up most of the website. They can be anything from labels to buttons to navigation menus.

```
import React from "react";

export default function FunctionComponent() {
  return (
    <div>
      {/*This is a comment*/}
      <h1>Here's some markup!</h1>
    </div>
  )
}
```

To use this component in another component file, we gotta import it.
`import FunctionComponent from "file/path/to/FunctionComponent.js";`

To refer and use that component, inside the return output, we can add it like so:
```
function App() {
  return (
    <FunctionComponent />
  )
}
```

Every React application must be rendered from a root component. It is usually done like this:
```
// The Imports
import React from "react";
import { createRoot } from "react-dom/client";

// The Component
export default function App() {
  return (
    <div>
      {/* Returned JSX here */}
    </div>
  )
}

// Finding the Mount Point
const container = document.getElementById("root");

// Create the Root and Rendering
const root = createRoot(container);
root.render(<App />);
```

1. Import React and the modern rendering API.
2. Define a component (`App`) that describes your UI with JSX.
3. Locate the placeholder element (`#root`) in the HTML page.
4. Create a React “root” and render the component tree inside it.

That’s the entire skeleton of a React application: **component → root element → render to the page**.