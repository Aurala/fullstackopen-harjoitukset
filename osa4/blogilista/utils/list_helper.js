const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
      return null
  }
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
      return null
  }
  const authorCount = _(blogs)
    .countBy('author')
    .map((count, author) => ({ author, blogs: count }))
    .maxBy('blogs')
  return authorCount
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
