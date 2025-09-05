import { useState } from 'react'

const Blog = ({ blog , onLike , onUnlike , currentUser, onDelete }) => {
  const [toggleValue,setToggleValue] = useState (false)
  const likedBy = blog.likedBy || []
  const currentUserId = currentUser?.id
  const hasLiked = likedBy.some(u => u.toString() === currentUserId)
  const blogOwner = blog.user[0]?.id || 'anon'
  const ofUser = blogOwner === currentUserId
  return(
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setToggleValue(v => !v)}>{toggleValue? 'hide' : 'show' }</button>
      {toggleValue && (
        <div style={{ marginTop: '6px' }}>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}
            {!hasLiked? (<button onClick = {() => onLike(blog)}>Like</button>) : (<button onClick = {() => onUnlike(blog)}>Unlike</button>)} </p>
          <p>Added by: {blog.user[0]?.username || 'anonymous'}</p>
          <p> {ofUser? <button onClick = { () => onDelete(blog)}>delete</button> : ''} </p>
        </div>
      )}
    </div>
  )
}
export default Blog


