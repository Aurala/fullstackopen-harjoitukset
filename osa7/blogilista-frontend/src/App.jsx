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
  removeBlog,
} from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      console.log('User found in local storage:', loggedInUserJSON)
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in using credentials:', username, password)
    try {
      const user = await blogService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      console.log('User logged in:', user)

      dispatch(showNotification(`${user.name} logged in successfully`, 5))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error)
      dispatch(showNotification('Wrong credentials', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    dispatch(showNotification('Logged out successfully', 5))
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
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
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
