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
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 12,
    __v: 0
  }
]

describe('total likes', () => {
 
  test('when list has no blogs, sum equals to zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, sum equals to the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('when list has many blogs, sum equals to the likes of all', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })

})

describe('favorite blog', () => {

  test('when list has no blogs, null is returned', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    expect(result).toBeNull()
  })

  test('when list has one blog, it is returned', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result.title).toBe('React patterns')
  })

  test('when list has many blogs, the one with most likes is returned (any, if multiple)', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(['Canonical string reduction', 'First class tests']).toContain(result.title)
  })

})

describe('most blogs', () => {

  test('when list has no blogs, null is returned', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    expect(result).toBeNull()
  })

  test('when list has one blog, its author is returned', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result.author).toBe('Michael Chan')
    expect(result.blogs).toBe(1)
  })

  test('when list has many blogs, the author with most blogs is returned', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.blogs).toBe(2)
  })

})

describe('most likes', () => {

  test('when list has no blogs, null is returned', () => {
    const result = listHelper.mostLikes(listWithNoBlogs)
    expect(result).toBeNull()
  })

  test('when list has one blog, its author is returned', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result.author).toBe('Michael Chan')
    expect(result.likes).toBe(7)
  })

  test('when list has many blogs, the author with most likes is returned', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
  })

})
