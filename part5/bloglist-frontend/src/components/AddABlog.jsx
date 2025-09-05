import blogService from '../services/blogs'
import { useState } from 'react'


const AddABlog = ({ onBlogCreated, setMessage })  => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')


  const handleBlog = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create({ 'title':title,
        'author':author,
        'url':url
      })
      setAuthor('')
      setUrl('')
      setTitle('')
      onBlogCreated?.(blog)
      setMessage(`Added "${blog.title}" by ${blog.author}`)
    }catch{
      setMessage('Wrong input inserted')
    }}
  return(
    <div>
      <form onSubmit = {handleBlog}>
        <div>
            title <input
            type="text"
            placeholder="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
            url    <input
            type="text"
            placeholder="title"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
            author <input
            type="text"
            placeholder="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AddABlog