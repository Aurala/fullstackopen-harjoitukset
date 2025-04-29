import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set: (state, action) => {
      console.log('Setting a notification:', action.payload)
      return action.payload
    },
    clear: () => {
      console.log('Clearing a notification')
      return ''
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const showNotification = (message, seconds = 5) => {
  console.log('Showing a notification:', message, 'for', seconds, 'seconds')

  return async (dispatch) => {
    dispatch(set({ message: message }))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
