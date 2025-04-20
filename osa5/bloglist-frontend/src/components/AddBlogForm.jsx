import { useState } from 'react'

const AddBlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    try { 
      const result = await addBlog(newBlogObject)
      setNewBlog({ title: '', author: '', url: '' })
    } catch (error) {
      console.error('Error adding blog:', error)
    }
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            value={newBlog.title}
            onChange={event => setNewBlog({ ...newBlog, title: event.target.value })}
          />
        </div>
        <div>
          author:
          <input
            value={newBlog.author}
            onChange={event => setNewBlog({ ...newBlog, author: event.target.value })}
          />
        </div>
        <div>
          url:
          <input
            value={newBlog.url}
            onChange={event => setNewBlog({ ...newBlog, url: event.target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
} 

export default AddBlogForm
