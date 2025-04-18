import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoggedInUser from './components/LoggedInUser'
import blogService from './services/blogs'
import login from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({message: null, isError: false})

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
    console.log('Logging in with', username, password)
    try {
      const user = await blogService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      console.log('Login successful:', user)
      showMessage('Login successful', 5, false)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.error('Login failed')
      showMessage('Wrong credentials', 5, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setBlogs([])
    showMessage('Logged out successfully', 5, false)
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
          <h1>log in to application</h1>
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
          <h1>blogs</h1>
          <Message message={message.message} isError={message.isError} />
          <LoggedInUser name={user.name} handleLogout={handleLogout} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )} 
    </div>
  )
}

export default App