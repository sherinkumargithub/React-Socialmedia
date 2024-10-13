import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { useState, useEffect } from 'react'
// import Feed from './Feed'
import {format} from "date-fns"
import { Routes, Route, useNavigate } from 'react-router-dom'
// axios import
import api from "./api/posts"
import EditPost from './EditPost'


function App() {
  // making Some default post in the page
  const [posts, setPosts] = useState([

  /*
    {
      id: 1,
      title: "1st post",
      date: "1/3/2023",
      body: "The post about the college itensa function"
    },
    {
      id: 2,
      title: "2nd post",
      date: "1/4/2023",
      body: "The post about the Dhardhini birthday"
    },
    {
      id: 3,
      title: "3 rd post",
      date: "1/5/2023",
      body: "The post about the Hackathon"
    },
    {
      id: 4,
      title: "4th post",
      date: "1/8/2023",
      body: "The post about the college Onam funcion"
    },
    {
      id: 5,
      title: "5th post",
      date: "1/9/2023",
      body: "The post about the first iterview expirence"
    }
  */
  ])
  // arrau destructuring concept for nav
  const [search, setSearch] = useState('')
  // while search for the specific post
  const [searchResult, setSearchResult] = useState([])
  // now using the useEffect for the searching the post using the filteration
  useEffect(() => {
    const filteredResults = posts.filter((post) => 
      post.body.toLowerCase().includes(search.toLowerCase()) || 
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  
    setSearchResult(filteredResults.reverse());
  }, [posts, search]);
  
  // to handle the handlepost for the updation of the new post toward the existing post
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  // after deletion of the post the page should navigate to the home page using the useNavigate hook
  const navigate = useNavigate();

  // axious - edit, variable declarations
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  // api fetch - axious
  useEffect(() => {
    const fetchPosts = async ()=>{
      try{
        const response = await api.get('/posts');
        // .get helps to fetch the data
        setPosts(response.data);
        // here the .data helps to fetch the direct data whithout converting it to josn to stringfy
     }
      catch(err){
        // this will work if the error range is not in the 200 range,cause axios its handle it in most of thecases
        if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
    }
    fetchPosts();
  }, [])

  const handlePost = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {
      id, title: postTitle, date: datetime, body: postBody
    }
    // here for the api fetch for the new post data
    // setting up this logic into the try
    try{
    const response = await api.post('/posts', newPost)
    // const allPosts = [...posts, newPost]
    const allPosts = [...posts, response.data];
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    }
    catch(err){
      // this will work if the error range is not in the 200 range,cause axios its handle it in most of thecases
      if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }

  }

  // dummu handle delete
  // here the problem i guess was the id which is fetch the data for the deletion operation
  const handleDelete = async (id) => {
    try{
      // api call for delete operation
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id);
      console.log(postsList);  // Check if the post has been removed
      setPosts(postsList)
      // to redirct to home after deletion of the post
      // here the navigate is hook from the react library, it helps to navigate to the mention page while some action occured there.
      navigate('/')
    } catch(err){
      console.log(`Error: ${err.message}`); 
   }
  }

  // now the thing is to update/edit/modify the data
  const handleEdit = async(id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, title: editTitle, datetime, body: editBody};

    // try section to make chenges using put method
    try{
      const response = await api.put(`/posts/${id}`, updatedPost)
      // this helps to update the lated id which involve in changes
      setPosts(posts.map(post => post.id === id ? {
        ... response.data
      }: posts
    ))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }
    catch (err){
      console.log(`Error: ${err.message}`);
    }
  }
   
  return (
    <div className="App">
      <Header title= "Sherin's Media"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route 
          path='/'
          element = {
            <Home 
            //  posts = {posts}
              posts = {searchResult}
            />
          }
        />
        <Route path='post'>
          <Route 
            index
            element = {
              <NewPost
                handlePost = {handlePost}
                postTitle = {postTitle}
                setPostTitle={setPostTitle}
                postBody = {postBody}
                setPostBody={setPostBody}
              />
            }
          />
  
          <Route 
            path=':id'
            element = {
              <PostPage 
                posts = {posts} 
                handleDelete = {handleDelete}
              />
            }
          />
        </Route>
                {/* edit post and postpage component - axious */}
                <Route 
            path='/edit/:id'
            element ={
              <EditPost 
                posts = {posts}
                handleEdit ={handleEdit}
                editBody = {editBody}
                setEditBody = {setEditBody}
                editTitle = {editTitle}
                setEditTitle ={setEditTitle}
              />
            }
          />
        {/* <PostPage/> */}
        <Route path='about'  element = {<About/>}/>
        <Route path='*' element = {<Missing/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
