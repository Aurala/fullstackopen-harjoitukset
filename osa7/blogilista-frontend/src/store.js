import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

console.log('Initial Redux store state:', store.getState())

export default store
