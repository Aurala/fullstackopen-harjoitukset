const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert/strict');
const app = require('../app');
const blog = require('../models/blog');
const { initial } = require('lodash');

const api = supertest(app)

const testBlogs = [
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
  // Missing likes property
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    __v: 0
  },
  // Broken blog post, title property is missing
  {
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    __v: 0
  },
  // Broken blog post, url property is missing
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    __v: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testBlogs[0])
  await blogObject.save()
  blogObject = new Blog(testBlogs[1])
  await blogObject.save()
  blogObject = new Blog(testBlogs[2])
  await blogObject.save()
})

test('the right amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 3)
})

test('the unique identifier property of the blog posts is named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.notStrictEqual(blog.id, undefined)
    assert.strictEqual(blog._id, undefined)
  })
})

test('the blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(testBlogs[3])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const authors = response.body.map(r => r.author)
  
  assert.strictEqual(response.body.length, 4)
  assert(authors.includes('Robert C. Martin'))
})

test('if likes property is missing, it will default to 0', async () => {
  await api
    .post('/api/blogs')
    .send(testBlogs[3])
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body[3].likes, 0)
})

test('if title property is missing, 400 Bad Request is returned', async () => {
  await api
    .post('/api/blogs')
    .send(testBlogs[4])
    .expect(400)
})

test('if url property is missing, 400 Bad Request is returned', async () => {
  await api
    .post('/api/blogs')
    .send(testBlogs[5])
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
