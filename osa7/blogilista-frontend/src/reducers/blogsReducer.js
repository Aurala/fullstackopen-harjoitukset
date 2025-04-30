import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      console.log('Setting blogs:', action.payload)
      return action.payload
    },
    appendBlog: (state, action) => {
      console.log('Appending blog:', action.payload)
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      console.log('Updating blog:', updatedBlog)
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog: (state, action) => {
      console.log('Removing blog:', action.payload)
      return state.filter((blog) => blog.id !== action.payload)
    },
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  console.log('Storing blogs')
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      console.log('Fetched blogs:', blogs)
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.error('Error fetching blogs:', error)
      dispatch(showNotification('Error fetching blogs', 5))
      throw error
    }
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      console.log('Creating a new blog:', blogObject)
      const newBlog = await blogService.addBlog(blogObject)
      dispatch(appendBlog(newBlog))

      // Refreshing the blog list after adding a new blog
      dispatch(initializeBlogs())

      dispatch(showNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5))
      return newBlog
    } catch (error) {
      dispatch(showNotification('Error creating blog', 5))
      throw error
    }
  }
}

export const likeBlog = (blogObject) => {
  console.log('Liking blog:', blogObject)
  return async (dispatch) => {
    try {
      const likedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1
      }
      const updatedBlog = await blogService.updateBlog(likedBlog)
      console.log('Updated blog:', updatedBlog)
      dispatch(updateBlog(updatedBlog))
      dispatch(showNotification(`You liked ${updatedBlog.title} by ${updatedBlog.author}`, 5))
      return updatedBlog
    } catch (error) {
      console.error('Error liking blog:', error)
      dispatch(showNotification('Error liking blog', 5))
      throw error
    }
  }
}

export const deleteBlogById = (id) => {
  console.log('Deleting blog:', id)
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
      dispatch(showNotification(`Blog deleted successfully`, 5))
    } catch (error) {
      console.error('Error deleting blog:', error)
      dispatch(showNotification('Error deleting blog', 5))
      throw error
    }
  }
}

export default blogsSlice.reducer
