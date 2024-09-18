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


function App() {
  // making Some default post in the page
  const [posts, setPosts] = useState([
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
      title: "3rd post",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {
      id, title: postTitle, date: datetime, body: postBody
    }
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')

  }
  return (
    <div className="App">
      <Header title= "Sherin's Media"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Home 
      //  posts = {posts}
        posts = {searchResult}
      />
      <NewPost
        handleSubmit = {handleSubmit}
        postTitle = {postTitle}
        setPostTitle={setPostTitle}
        postBody = {postBody}
        setPostBody={setPostBody}
      />
      <PostPage/>
      <About/>
      <Missing/>
      <Footer/>
    </div>
  );
}

export default App;
