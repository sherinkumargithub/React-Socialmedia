import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = ( /*{posts, isLoading, fetchError} */) => {
  const {posts, isLoading, fetchError} = useContext(DataContext)
  return (
    /*
    <main className='Home'>
      {posts.length ? (
        <Feed posts = {posts} />
      ): (
        <p style={{marginTop:"2rem"}}>
          No post to display
        </p>
      )}
    </main>
    // changes based on the custom hooks
    */
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>
      {fetchError}</p>}
      {!isLoading && ! fetchError && (posts.length? <Feed posts={posts} /> : <p
      className="statusMsg">No posts to display.</p>)}
    </main>
  )
}

export default Home