const { test, after, beforeEach } = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert/strict');
const app = require('../app');

const api = supertest(app)

// Added to the database before each test
const initialUsers = [
  {
    _id: '67f0e1c07d106a8788ca445f',
    username: 'tupu',
    name: 'Tupu Ankka',
    passwordHash: '$2b$10$dtKdi1.9ZYYQxkwziimBzu7s5GBEI3OjTXCNKV3OsmAS4TRnJ1gzj',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ]
  },
  {
    _id: '67f0e1c07d106a8788ca4461',
    username: 'hupu',
    name: 'Hupu Ankka',
    passwordHash: '$2b$10$dtKdi1.9ZYYQxkwziimBzu7s5GBEI3OjTXCNKV3OsmAS4TRnJ1gzk',
    blogs: []
  },
  {
    _id: '67f0e1c07d106a8788ca4463',
    username: 'lupu',
    name: 'Lupu Ankka',
    passwordHash: '$2b$10$dtKdi1.9ZYYQxkwziimBzu7s5GBEI3OjTXCNKV3OsmAS4TRnJ1gzl',
    blogs: []
  }
]

// Invalid users that should not be created because of missing/invalid properties
const invalidUsers = [
  // 'username' is missing
  {
    name: 'Aku Ankka',
    password: 'password'
  },
  // 'password' is missing
  {
    username: 'aku',
    name: 'Aku Ankka',
  },
  // 'name' is missing
  {
    username: 'aku',
    password: 'password'
  },
  // 'username' is too short
  {
    username: 'ak',
    name: 'Aku Ankka',
    password: 'password'
  },
  // 'password' is too short
  {
    username: 'aku',
    name: 'Aku Ankka',
    password: 'pa'
  },
  // 'username' is not unique
  {
    username: 'tupu',
    name: 'Tupu Ankka',
    password: 'password'
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const userObject = new User(user);
    await userObject.save();
  }
})

test('the right amount of users is returned', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 3)
})

test('a new user can be added', async () => {
  const newUser = {
    username: 'aku',
    name: 'Aku Ankka',
    password: 'salasana'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, initialUsers.length + 1)
})

test('no password hashes are returned', async () => {
  const response = await api.get('/api/users')
  response.body.forEach(user => {
    assert.strictEqual(user.passwordHash, undefined)
  })
})

test('no users are created with missing/invalid properties', async () => {
  for (const newUser of invalidUsers) {
    console.log(`Testing user creation with: ${JSON.stringify(newUser)}`)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  }
})

after(async () => {
  await mongoose.connection.close()
})
