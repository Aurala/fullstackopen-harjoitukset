import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blogObject, addLike, deleteBlog, currentUsername }) => {
  console.log('Blog component props:', blogObject, currentUsername)

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    try {
      console.log('Liking blog:', blogObject)
      await addLike(blogObject)
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const handleDelete = async () => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      try {
        await deleteBlog(blogObject.id)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  return (
    <div className="blog">
      {blogObject.title} {blogObject.author}
      &nbsp;&nbsp;
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div className={visible ? 'visible' : 'hidden'}>
        {blogObject.url}
        <br />
        {blogObject.likes} likes &nbsp;&nbsp;
        <button onClick={handleLike}>like</button>
        <br />
        added by {blogObject.user[0].name}
        {blogObject.user[0].username === currentUsername ? (
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blogObject: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
}

export default Blog
