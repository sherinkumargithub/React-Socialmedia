import React from 'react'

const NewPost = ({handlePost, postTitle, setPostTitle, postBody, setPostBody }) => {
  return (
      <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handlePost}>
          <label htmlFor="postTitle">Title:</label>
          <input 
            type="text"
            id='postTitle' 
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />

          <label htmlFor="postBody">Post:</label>
          <input 
            type="text"
            id='postBody'
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            required
         />
         <button type='submit'>Submit</button>
        </form>
      </main>
  )
}

export default NewPost