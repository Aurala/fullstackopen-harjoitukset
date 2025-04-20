import { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
        <button>like</button><br />
        added by {blog.user[0].name}
      </div>
    </div>
  )
}

export default Blog
