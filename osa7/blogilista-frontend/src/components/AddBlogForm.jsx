import { useState } from 'react'
import PropTypes from 'prop-types'

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
          <label htmlFor="title">title:</label>
          <input
            id="title"
            value={newBlog.title}
            onChange={(event) =>
              setNewBlog({ ...newBlog, title: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            id="author"
            value={newBlog.author}
            onChange={(event) =>
              setNewBlog({ ...newBlog, author: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            id="url"
            value={newBlog.url}
            onChange={(event) =>
              setNewBlog({ ...newBlog, url: event.target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
