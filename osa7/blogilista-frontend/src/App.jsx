import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoggedInUser from './components/LoggedInUser'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  setBlogs,
  createBlog,
  likeBlog,
  deleteBlogById,
} from './reducers/blogsReducer'
import { useUser } from './UserContext'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { user, loginUser, logoutUser, initUser } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const createFormRef = useRef()

  useEffect(() => {
    if (user) {
      console.log('Initializing blogs')
      dispatch(initializeBlogs())
    } else {
      console.log('User is not logged in, clearing blogs')
      dispatch(setBlogs([]))
    }
  }, [user, dispatch])

  useEffect(() => {
    console.log('Checking the local storage for logged in user')
    initUser()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging in using credentials:', username, password)
      await loginUser({ username, password })
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = () => {
    console.log('Logging out user')
    logoutUser()
  }

  const addBlog = async (blogToAdd) => {
    console.log('Creating new blog:', blogToAdd)
    try {
      const createdBlog = await dispatch(createBlog(blogToAdd))
      createFormRef.current.toggleVisibility()
      return createdBlog
    } catch (error) {
      console.error('Error creating blog:', error)
      throw error
    }
  }

  const addLike = async (likedBlog) => {
    console.log('Adding a like:', likedBlog)
    try {
      return await dispatch(likeBlog(likedBlog))
    } catch (error) {
      console.error('Error liking a blog:', error)
      throw error
    }
  }

  const deleteBlog = async (id) => {
    console.log('Deleting blog with id:', id)
    try {
      dispatch(deleteBlogById(id))
      dispatch(showNotification('Blog deleted successfully', 5))
    } catch (error) {
      console.error('Error deleting blog:', error)
      dispatch(showNotification('Error deleting blog', 5))
    }
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to blogilista application</h1>
          <Notification />
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">username:</label>
              <input
                id="username"
                data-testid="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">password:</label>
              <input
                id="password"
                data-testid="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>blogilista application</h1>
          <Notification />
          <LoggedInUser name={user.name} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={createFormRef}>
            <AddBlogForm addBlog={addBlog} />
          </Togglable>
          <h1>blogs</h1>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blogObject={blog}
                addLike={addLike}
                deleteBlog={deleteBlog}
                currentUsername={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
