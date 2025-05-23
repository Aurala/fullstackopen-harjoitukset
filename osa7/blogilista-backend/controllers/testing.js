const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response, next) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
  } catch (error) {
    console.error('Error resetting database:', error)
    next(error)
  }
})

module.exports = router
