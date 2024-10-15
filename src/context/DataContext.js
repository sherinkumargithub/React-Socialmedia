import {createContext, useState, useEffect} from "react";
// the missing import section from app.js which need here
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom'
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize"
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({})
// here know that this DataProvieder method/fuction which decides the link between each of the state in our spa.
// it determine that were should the data to transfer or link between the components
export const DataProvieder =  ({children}) => {
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
        const [searchResult , setSearchResult] = useState([])
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
  
  
        // axious - edit, variable declarations
        const [editTitle, setEditTitle] = useState('')
        const [editBody, setEditBody] = useState('')
  
          // after deletion of the post the page should navigate to the home page using the useNavigate hook
          const navigate = useNavigate();
  
          // custom hook
          const {width} = useWindowSize()
  
          // custom hook 2
          const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')
          useEffect(()=>{
            setPosts(data);
          }, [data])
  
      /*
      // commanding the whole api fetch cause we using our own custom hook for it.
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
  
        */
  
  
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
            setPosts(posts.map(post => post.id === id ? {...response.data}: posts))
            setEditTitle('')
            setEditBody('')
            navigate('/')
          }
          catch (err){
            console.log(`Error: ${err.message}`);
          }
        }

    return(
        <DataContext.Provider value = {{
            // here we passing the children/attributes
            // here we dont need to duplicate it eg,posts comming thrice but we mention only once
            // here we giving all the vlaues to the children - header-1, nav -2, home-3,NewPOST-5,postPage-2 but posts not duplicate so it 1, edit context - 6-1=5,
            width, search, setSearch, posts, isLoading, fetchError,
            handlePost, postTitle, setPostTitle, postBody, setPostBody,
            handleDelete,
            handleEdit, editBody, setEditBody,
            editTitle, setEditTitle,
            searchResult

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext