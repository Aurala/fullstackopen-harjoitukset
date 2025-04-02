const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
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
