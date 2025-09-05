import { useState, useEffect , useRef } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import AddABlog from './components/AddABlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState('')
  const [user,setUser] = useState(null)
  const blogFromRef = useRef()

  const handleLike = async (blog) => {
    const updated = await blogService.like(blog.id)
    setBlogs(prev => prev.map(b => b.id === blog.id ? updated : b))
  }

  const handleUnlike = async (blog) => {
    const updated = await blogService.unlike(blog.id)
    setBlogs(prev => prev.map(b => b.id === blog.id ? updated : b))
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) return
    try {
      await blogService.deleteOne(blog.id)
      setBlogs(prev => prev.filter(b => b.id !== blog.id))
      setMessage('Blog deleted')
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        setMessage('Not authorized. Please log in again.')
        window.localStorage.removeItem('loggedUser')
        setUser(null)
      } else {
        setMessage('Delete failed')
      }
    }
  }


  const setMessage = (msg) => {
    setMsg(msg)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  const handleBlogCreated = (blog) => {
    setBlogs(prev => prev.concat(blog))
    blogFromRef.current?.toggleVisibility()
  }

  const Logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setMessage('You have logged out successfully')
  }




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  return (
    <div>
      <Message message={msg} />
      {user === null ?
        <div>
          <Togglable buttonLabel = "Log in">
            <LoginForm setUser={setUser} setMessage ={setMessage} />
          </Togglable>
        </div>:
        <div>
          <p>User logged in: {user.name || user.username}</p>
          <button onClick={Logout}>Log out</button>
          <Togglable buttonLabel ="Create a new Blog" ref={blogFromRef}>
            <AddABlog onBlogCreated={handleBlogCreated} setMessage = {setMessage}   />
          </Togglable>
          <BlogList blogs={blogs} onLike={handleLike} onUnlike={handleUnlike} currentUser={user} onDelete={handleDelete}/>
        </div>}
    </div>

  )
}
export default App