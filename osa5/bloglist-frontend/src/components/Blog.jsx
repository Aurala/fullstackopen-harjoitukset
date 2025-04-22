import { useState } from 'react'

const Blog = ({ blogObject, addLike, deleteBlog, currentUsername }) => {

  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(blogObject)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const handleLike = async () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1,
    }

    try { 
      await addLike(updatedBlogObject)
      setBlog(updatedBlogObject)
    } catch (error) {
      console.error('Error adding blog:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await deleteBlog(blog.id)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      &nbsp;&nbsp;
      <button onClick={toggleVisibility}>{ visible ? 'hide' : 'view' }</button>
      <div className={ visible ? 'visible' : 'hidden' }>
        {blog.url}<br />
        {blog.likes} likes
        &nbsp;&nbsp;
        <button onClick={handleLike}>like</button><br />
        added by {blog.user[0]?.name}
        {blog.user[0]?.username === currentUsername
          ? <div><button onClick={handleDelete}>remove</button></div>
          : null
        } 
      </div>
    </div>
  )
}

export default Blog
