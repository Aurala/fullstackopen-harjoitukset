const { connectToMemoryServer, closeMemoryServer } = require('./mongo_test_helper')
const supertest = require('supertest')
const app = require('../app');
const { initializeUsers, initializeBlogs, initialBlogs, invalidBlogs } = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
  await connectToMemoryServer()
})

afterAll(async () => {
  await closeMemoryServer()
})

beforeEach(async () => {
  await initializeUsers()
  await initializeBlogs()
})

test('the right amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

test('a blog can be added, even if likes not set', async () => {
  const expectedAuthor = invalidBlogs[0].author
  await api
    .post('/api/blogs')
    .send(invalidBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const authors = response.body.map(r => r.author)
  
  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(authors).toContain(expectedAuthor)
})

test('if property title is missing, 400 Bad Request is returned', async () => {
  await api
    .post('/api/blogs')
    .send(invalidBlogs[1])
    .expect(400)
})

test('if property url is missing, 400 Bad Request is returned', async () => {
  await api
    .post('/api/blogs')
    .send(invalidBlogs[2])
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogToDelete = initialBlogs[0]._id
  const blogName = initialBlogs[0].title

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(2)
  expect(titles).not.toContain(blogName)
})

test('a non-existing object id is managed properly, 404 Not Found is returned', async () => {
  const blogToDelete = '5a422b891b54a676234d17fb'

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .expect(404)
})

test('an invalid object id is managed properly, 400 Bad Request is returned', async () => {
  const blogToDelete = 'invalidObjectId'

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .expect(400)
})

test('a blog can be updated', async () => {
  const blogToUpdate = initialBlogs[0]._id
  const updatedBlog = {
    ...initialBlogs[0],
    title: 'New title',
    author: 'New author',
    url: 'New url',
    likes: 42
  }
  delete updatedBlog._id
  delete updatedBlog.__v

  await api
    .put(`/api/blogs/${blogToUpdate}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const returnedBlog = response.body.find(blog => blog.id === blogToUpdate)

  expect(returnedBlog.title).toBe(updatedBlog.title)
  expect(returnedBlog.author).toBe(updatedBlog.author)
  expect(returnedBlog.url).toBe(updatedBlog.url)
  expect(returnedBlog.likes).toBe(updatedBlog.likes)
})
