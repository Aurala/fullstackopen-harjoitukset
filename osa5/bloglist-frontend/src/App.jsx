import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoggedInUser from './components/LoggedInUser'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({message: null, isError: false})

  const createFormRef = useRef()

  useEffect(() => {
    if (user) {
      blogService.getAllBlogs().then(blogs => {
        console.log('Fetched blogs:', blogs)
        setBlogs(blogs)
      }).catch(error => {
        console.error('Error fetching blogs:', error)
        showMessage('Error fetching blogs', 5, true)
      })
    } else {
      setBlogs([])
    }
  }, [user])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      console.log('User logged in:', user)

      showMessage(`${user.name} logged in successfully`, 5, false)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error)
      showMessage('Wrong credentials', 5, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setBlogs([])
    showMessage('Logged out successfully', 5, false)
  }

  const addBlog = async (blogToAdd) => {
    console.log('Creating new blog:', blogToAdd)
    try {
      const createdBlog = await blogService.addBlog(blogToAdd)
      const updatedBlogs = await blogService.getAllBlogs()
      setBlogs(updatedBlogs)
      showMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`, 5, false)
      createFormRef.current.toggleVisibility()
      return createdBlog
    } catch (error) {
      console.error('Error creating blog:', error)
      showMessage('Error creating blog', 5, true)
      throw error
    }
  }

  const addLike = async (blogToUpdate) => {
    console.log('Adding a like:', blogToUpdate)
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate)
      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      showMessage(`You liked ${updatedBlog.title} by ${updatedBlog.author}`, 5, false)
      return updatedBlog
    } catch (error) {
      console.error('Error adding like:', error)
      showMessage('Error adding like', 5, true)
      throw error
    }
  }

  const deleteBlog = async (id) => {
    console.log('Deleting blog with id:', id)
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
      showMessage('Blog deleted successfully', 5, false)
    } catch (error) {
      console.error('Error deleting blog:', error)
      showMessage('Error deleting blog', 5, true)
    }
  }

  const showMessage = (message, seconds, isError) => {
    console.log('Message:', message, seconds, isError)
    setMessage({message: message, isError: isError})
    setTimeout(() => {
      setMessage({message: null, isError: false})
    }, seconds * 1000)
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to blogilista application</h1>
          <Message message={message.message} isError={message.isError} />
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">username:</label>
              <input
                id="username"
                data-testid='username'
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
                data-testid='password'
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
          <Message message={message.message} isError={message.isError} />
          <LoggedInUser name={user.name} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={createFormRef}>
            <AddBlogForm addBlog={addBlog} />
          </Togglable>
          <h1>blogs</h1>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog key={blog.id} blogObject={blog} addLike={addLike} deleteBlog={deleteBlog} currentUsername={user.username}/>)
          }
        </div>
      )} 
    </div>
  )
}

export default App
