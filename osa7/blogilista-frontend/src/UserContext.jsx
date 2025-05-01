import { createContext, useReducer, useContext } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import { showNotification } from './reducers/notificationReducer'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  const dispatch = useDispatch()

  const loginUser = async (credentials) => {
    try {
      const loggedInUser = await blogService.login(credentials)
      console.log('User logging in:', credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      userDispatch({ type: 'SET', payload: loggedInUser })
      dispatch(showNotification(`${loggedInUser.name} logged in successfully`))
      return loggedInUser
    } catch (error) {
      dispatch(showNotification('Wrong credentials'))
      blogService.setToken(null)
      throw error
    }
  }

  const logoutUser = () => {
    try {
      console.log('Logging out user')
      window.localStorage.removeItem('loggedInUser')
      blogService.setToken(null)
      userDispatch({ type: 'CLEAR' })
      dispatch(showNotification('Logged out successfully'))
    } catch (error) {
      console.error('Error during logout:', error)
      dispatch(showNotification('Error logging out'))
      throw error
    }
  }

  const initUser = () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    console.log('Initializing user from local storage:', loggedInUserJSON)
    if (loggedInUserJSON) {
      try {
        const loggedInUser = JSON.parse(loggedInUserJSON)
        blogService.setToken(loggedInUser.token)
        userDispatch({ type: 'SET', payload: loggedInUser })
      } catch (error) {
        console.error('Error parsing user from local storage:', error)
        window.localStorage.removeItem('loggedInUser')
        dispatch(showNotification('Error initializing user'))
      }
    } else {
      console.log('No user found in local storage')
      blogService.setToken(null)
      userDispatch({ type: 'CLEAR' })
    }
  }

  const values = {
    loginUser,
    logoutUser,
    initUser,
    user,
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useUser = () => {
  return useContext(UserContext)
}

export default UserContext
