import { useState } from 'react'

const Blog = ({ blogObject, addLike }) => {

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
      </div>
    </div>
  )
}

export default Blog
