const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

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

    const decodedToken = jwt.verify(request.token, SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'invalid user' })
    }

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
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(request.user)
    if (!user) {
      return response.status(401).json({ error: 'invalid user' })
    }

    const deletedBlog = await Blog.findById(request.params.id)
    if (!deletedBlog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (deletedBlog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'the blog belongs to another user' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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
      likes,
    }
    const changedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogToUpdate,
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { blogs: 0 }) 
    if (changedBlog) {
      response.json(changedBlog)
    } else {
      return response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
