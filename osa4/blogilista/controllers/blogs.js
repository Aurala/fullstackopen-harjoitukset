const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)

    // Temporarily hardcoded user id
    const user = await User.findOne({ username: 'tupu' })
    blog.user = user

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body
    const blogToUpdate = {
      title,
      author,
      url,
      likes
    }
    const changedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogToUpdate,
      { new: true, runValidators: true, context: 'query' }
    )
    if (changedBlog) {
      response.json(changedBlog)
    } else {
      return response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter
