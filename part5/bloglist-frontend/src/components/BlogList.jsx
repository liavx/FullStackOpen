
import Blog from './Blog'

const BlogList = ({ blogs,onLike,onUnlike , currentUser , onDelete }) => {
  return(
    <div>
      <h2>blogs</h2>
      {blogs.toSorted((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} onLike={onLike} onUnlike={onUnlike} currentUser = {currentUser} onDelete={onDelete}/>
      )}
    </div>
  )
}

export default BlogList