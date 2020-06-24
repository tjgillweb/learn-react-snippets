import React, {useState, useEffect} from 'react';
import axios from 'axios'

const DataFetching = () => {
    // const [posts, setPosts] = useState([]) 
    //1. change posts to post and set it to empty object instead of empty array
    const [post, setPost] = useState({})
    const [id, setId] = useState(1)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`) //2. change the url to append the post id
            .then(res => {
                console.log(res)
                setPost(res.data) //3. change setPosts to setPost
            })
            .catch(err => {
                console.log(err)
            })
    }, [id]) //4. Add id to the dependency list
    return ( 
        <div>
            { /* 5. Add an input button */ }
            <input type="text" value={id} onChange={e => setId(e.target.value)}/>
            <div>{post.title}</div>
            { /* 6. comment out the code for displating posts data */ }
            {/* <ul>
                { 
                    posts.map(post => <li key={post.id}>{post.title}</li>)
                }
            </ul> */}
        </div>
     );
}
 
export default DataFetching;