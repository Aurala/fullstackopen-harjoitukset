import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer
  }
})

console.log('Initial Redux store state:', store.getState())

export default store
