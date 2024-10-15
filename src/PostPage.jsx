import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Missing from './Missing';
import DataContext from './context/DataContext';


const PostPage = () => {
  const {posts, handleDelete} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
         <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>

            {/* update in editPost component */}
            <Link to={`/edit/${post.id}`}>

            <button className='deleteButton' >Edit Post</button>
            </Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
         </> 
        }
        {!post && 
          <>
            <Missing/>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage