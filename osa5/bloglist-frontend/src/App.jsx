import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoggedInUser from './components/LoggedInUser'
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
      blogService.getAll().then(blogs => {
        console.log('Fetched blogs:', blogs)
        setBlogs(blogs)
      }).catch(error => {
        console.error('Error fetching blogs:', error)
        showMessage('Error fetching blogs', 5, true)
      });
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

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('Creating new blog:', event.target.title.value, event.target.author.value, event.target.url.value)
    try {
      const createdBlog = await blogService.add({
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      })
      setBlogs(blogs.concat(createdBlog))
      showMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`, 5, false)
      createFormRef.current.toggleVisibility()
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } catch (error) {
      console.error('Error creating blog:', error)
      showMessage('Error creating blog', 5, true)
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
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
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
          <Togglable buttonLabel="new note" ref={createFormRef}>
            <h1>create new</h1>
            <form onSubmit={handleCreate}>
              <div>title: <input type="text" name="title" /></div>
              <div>author: <input type="text" name="author" /></div>
              <div>url: <input type="text" name="url" /></div>
              <button type="submit">create</button>
            </form>
          </Togglable>
          <h1>blogs</h1>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )} 
    </div>
  )
}

export default App
