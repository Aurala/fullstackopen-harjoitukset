import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('Setting user:', action.payload)
      return action.payload
    },
    clearUser: () => {
      console.log('Clearing user')
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await blogService.login(credentials)
      console.log('User logging in:', credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(showNotification(`${user.name} logged in successfully`))
      return user
    } catch (error) {
      dispatch(showNotification('Wrong credentials'))
      blogService.setToken(null)
      throw error
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    try {
      console.log('Logging out user')
      window.localStorage.removeItem('loggedInUser')
      blogService.setToken(null)
      dispatch(clearUser())
      dispatch(showNotification('Logged out successfully'))
    } catch (error) {
      console.error('Error during logout:', error)
      dispatch(showNotification('Error logging out'))
      throw error
    }
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    console.log('Initializing user from local storage:', loggedInUserJSON)
    if (loggedInUserJSON) {
      try { 
        const loggedInUser = JSON.parse(loggedInUserJSON)
        blogService.setToken(loggedInUser.token)
        dispatch(setUser(loggedInUser))
      } catch (error) {
        console.error('Error parsing user from local storage:', error)
        window.localStorage.removeItem('loggedInUser')
        dispatch(showNotification('Error initializing user'))
      }
    } else {
      console.log('No user found in local storage')
      blogService.setToken(null)
      dispatch(clearUser())
    }
  }
}

export default userSlice.reducer
