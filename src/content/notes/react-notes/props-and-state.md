---
title: "Props and State"
tags: ["react"]
date: ""
category: "React"
---

**Props** are inputs you pass into a component. They are pieces of data that can be given to JSX elements for them to use or pass from parent to child. 

`<img src="selfie.png" alt="my selfie" />`
Here, `src` and `alt` are props that we can pass data through. 

Suppose we have a catalog of items that we want to return:
```
[
	{ name: "Cat", category: "Developer", website: "catlieb.com" },
	{ name: "Dan", category: "Developer", website: "dandeveloper.dev" },
	{ name: "hime", category: "Developer", website: "himetsai.com" }
]
```

We can render this list of items using `.map()`:
```
<div>
	{catalogItems.map(
		function(item) {
			return (
				<div>
					<h2> {item.name} </h2>
					<h3> Specialty: {item.category}</h3>
					<a href={item.website}> Learn more </a>
				</div>
			)
		}
	)}
</div>
```
Note that a function expression and arrow function work the same way

Arrow function example:
```
<ul>
  {fruits.map((fruit, index) => (
    <li key={index}>{fruit}</li>
  ))}
</ul>

```

### Parents and Children

No matter how many components are in a React app, they all trace back to a single root. 

![Tree](Pasted%20image%2020250924153234.png)

We can pass prop data down from parent child. For instance,  consider the function App(). We will pass data from this function (parent) to the CafeMenu (child) component like so:
```
#parent
function App() { 
	const menuData = ["mac n' cheese", "caesar salad", "hot dog"]; 
	return ( <CafeMenu menu={menuData} /> )
}

#child
function CafeMenu(props) { console.log(props) }
```
Console will log a dictionary of menu to an array of 3.

Another example:
Here, we pass two props in the parent.
```
export default function App() {
  return (
      <div>
    <h1>Notifications</h1>
    <Notification message="Fatima commented on your post." isRead={true} />
    <Notification message="Daniel's birthday is today! 🎂" isRead={false} />
    <Notification message="Rhea just posted on their feed!" isRead={true} />
  </div>
  )
}

# child
export default function Notification(props) {
  let classString = "";

  if (props.isRead == false) {
    classString = "not-read";
  }
  return <div className={classString}>{props.message}</div>;
}

```
Passed onto Notification component by `props.{<name of key>}`

### State

Props are ideal if the data isn't expected to change after being set. But what if our component's data changes? A component's **state** is the data that can change over time.
Examples of use:
- Open/Closed
- Items added/removed
- Inputs on a form
- Likes on a post

#### useState()
a function that returns an array of two values: the state instead and a function that sets the state.
`const [state, setState] = useState(value)`

To update or set the state value, we have to wrap it inside of a process that runs given an action or something.

### State as Props

State values can be passed as props to its child components.

`JSON.stringify()` turns an array into a string version of itself
```
# root
import React from "react";
import Quiz from "./Quiz.js"

export default function App() {
  return <Quiz />;
}

#parent
import React, { useState } from "react";
import Question from "./Question.js";

export default function Quiz() {
  const [questions, setQuestions] = useState([
    "What is the meaning of life?",
    "Is there a 4th of July in Great Britain?",
  ]);

  return (
    <div>
      <Question
        question={questions[0]}
      />
      <Question
        question={questions[1]}
      />
    </div>
  );
}

# Child
export default function Question(props) {
  return <p>{props.question}</p>;
}

```

#### Putting it all together

In App.js, we will have our array of data. As well as the component we want to pass.

```
...
	const [movieData, setMovieData] = useState(movieArray);

	return <TrendingList movies={movieData} />;
}
```
Next, we build new components to connect these data.

##### `<TrendingList> 
```
export default function TrendingList(props) {
  return (
    <div className="trending">
      <h2> Trending now:</h2>
      <div className="movie-list">
        {props.movies.map((movie) => {
          return  <Movie title={movie.title} releaseYear={movie.releaseYear} imageUrl={movie.imageUrl} />
        })}
      </div>
    </div>
  );
}
```
Note that it is `props.movie.map(...)` because movies was passed from the parent in `App()`.


##### `<Movie>`
```
export default function Movie(props) {
  return (
    <div className="movie">
  <img src={props.imageUrl} alt={props.title} />
  <div className="movie-info">
    <h3>{props.title}</h3>
    <h4>Released in {props.releaseYear}</h4>
  </div>
</div>
  );
}
```
Since data is passed from `<TrendingList>`, we use props and not movie.
