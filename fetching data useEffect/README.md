# Fetching Data with useEffect

In the example below, we will be fetching data from an endpoint using useEffect.
> Extra information: In the future, a new feature called suspense would be in charge for data fetching.

#### 1. Install the **Axios package**  
```npm install axios```
- You can use Fetch API, but I prefer Axios for data fetching.
- you can check in package.json, axios package is now added in the dependencies.

#### 2. Create a component DataFetching.js inside the components folder.

#### 3. Import React, useState, useEffect, and axios
```
import React, {useState, useeffect} from 'react';
import axios from 'axios'
```

#### 4. Fetch the data. 
- For that we'll be using JSON placeholder. In the browser, navigate to [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
- Scroll down to the resources section. The first end point /posts gives us access to a hundred posts. It gives us JSON data. 
- The URL 'https://jsonplaceholder.typicode.com/posts' is the URL we need to make a get request to in order to fetch this data,
- Lets make appropriate changes in DataFetching.js to fetch this array of posts.

#### DataFetching.js
```Javascript
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const DataFetching = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return ( 
        <div>
            <ul>
                { 
                    posts.map(post => <li key={post.id}>{post.title}</li>)
                }
            </ul>
        </div>
     );
}
 
export default DataFetching;
```
#### App.js
```Javascript
import React from 'react';
import './App.css';
import DataFetching from './components/DataFetching'

function App() {
  return (
    <div className="App">
      <DataFetching />
    </div>
  );
}

export default App;
```
- The posts titles are rendered in the UI but if you take a look at the console, we have had an infinite loop of data fetching. 
- We want the data to be fetched only once on componentDidMount.
- For that, we need to specify an empty dependency list to the useEffect

So, the final output after adding the empty dependency list looks like this:

![](img/useEffect-data-fetching1.png)
