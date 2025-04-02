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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
      return null
  }
  const authorLikes = _(blogs)
    .groupBy('author')
    .map((group, author) => ({ author, likes: _.sumBy(group, 'likes')}))
    .maxBy('likes')
  return authorLikes
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
