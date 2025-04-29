import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log('Setting a notification:', action.payload)
      return action.payload
    },
    clearNotification: () => {
      console.log('Clearing a notification')
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, seconds = 5) => {
  console.log('Showing a notification:', message, 'for', seconds, 'seconds')

  return async (dispatch) => {
    dispatch(setNotification({ message: message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
