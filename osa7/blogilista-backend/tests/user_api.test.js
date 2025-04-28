const {
  connectToMemoryServer,
  closeMemoryServer,
} = require('./mongo_test_helper')
const supertest = require('supertest')
const app = require('../app')
const {
  initializeUsers,
  initializeBlogs,
  initialUsers,
  invalidUsers,
} = require('./test_helper')

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

test('the right amount of users is returned', async () => {
  const response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)
})

test('a new user can be added', async () => {
  const newUser = {
    username: 'aku',
    name: 'Aku Ankka',
    password: 'salasana',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length + 1)
})

test('no password hashes are returned', async () => {
  const response = await api.get('/api/users')
  response.body.forEach((user) => {
    expect(user.passwordHash).toBeUndefined()
  })
})

test('no users are created with missing/invalid properties', async () => {
  for (const newUser of invalidUsers) {
    console.log(`Testing user creation with: ${JSON.stringify(newUser)}`)
    await api.post('/api/users').send(newUser).expect(400)
  }
})
