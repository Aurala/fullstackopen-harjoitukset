import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const message = action.payload
      console.log('Setting a notification:', message)
      return message
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
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
