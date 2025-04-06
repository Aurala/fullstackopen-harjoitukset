const { connectToMemoryServer, closeMemoryServer } = require('./mongo_test_helper')
const supertest = require('supertest')
const app = require('../app');
const { initializeUsers, initializeBlogs, initialUsers } = require('./test_helper')

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

test('token is returned with valid credentials', async () => {
  const loginUser = {
    username: initialUsers[0].username,
    password: initialUsers[0].password,
  }

  const response = await api
    .post('/api/login')
    .send(loginUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.token).toBeDefined()
})

test('token is not returned with invalid credentials', async () => {
  const loginUser = {
    username: initialUsers[0].username,
    password: 'wrongpassword'
  }

  await api
    .post('/api/login')
    .send(loginUser)
    .expect(401)
})
