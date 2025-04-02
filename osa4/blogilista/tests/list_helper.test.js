const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const listHelper = require('../utils/list_helper.js')

const listWithNoBlogs = []
const listWithOneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]
const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 12,
    __v: 0
  }
]

describe('total likes', () => {
 
  test('when list has no blogs, sum equals to zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, sum equals to the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 7)
  })

  test('when list has many blogs, sum equals to the likes of all', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 36)
  })

})

describe('favorite blog', () => {

  test('when list has no blogs, null is returned', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    assert.strictEqual(result, null)
  })

  test('when list has one blog, it is returned', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result.title, 'React patterns')
  })

  test('when list has many blogs, the one with most likes is returned (any, if multiple)', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.ok(result.title === 'Canonical string reduction' || result.title === 'First class tests')
  })

})

describe('most blogs', () => {

  test('when list has no blogs, null is returned', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    assert.strictEqual(result, null)
  })

  test('when list has one blog, its author is returned', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.strictEqual(result.author, 'Michael Chan')
    assert.strictEqual(result.blogs, 1)
  })

  test('when list has many blogs, the author with most blogs is returned', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    assert.strictEqual(result.blogs, 2)
  })

})

describe('most likes', () => {

  test('when list has no blogs, null is returned', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    assert.strictEqual(result, null)
  })

  test('when list has one blog, its author is returned', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.strictEqual(result.author, 'Michael Chan')
    assert.strictEqual(result.likes, 7)
  })

  test('when list has many blogs, the author with most likes is returned', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    assert.strictEqual(result.likes, 17)
  })

})
