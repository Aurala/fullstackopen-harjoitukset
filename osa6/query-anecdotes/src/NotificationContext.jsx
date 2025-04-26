import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const showNotification = (message, seconds = 5) => {
    console.log('Setting notification message:', message, seconds)
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      console.log('Clearing notification message')
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }

  const values = {
    notification,
    showNotification,
  }

  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

export default NotificationContext
