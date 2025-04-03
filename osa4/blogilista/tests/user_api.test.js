const { test, after, beforeEach } = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert/strict');
const app = require('../app');

const api = supertest(app)

const initialUsers = [
  {
    username: 'tupu',
    name: 'Tupu Ankka',
    passwordHash: '$2b$10$dtKdi1.9ZYYQxkwziimBzu7s5GBEI3OjTXCNKV3OsmAS4TRnJ1gzj'
  },
  {
    username: 'hupu',
    name: 'Hupu Ankka',
    passwordHash: '$2b$10$dtKdi1.9ZYYQxkwziimBzu7s5GBEI3OjTXCNKV3OsmAS4TRnJ1gzk'
  },
  {
    username: 'lupu',
    name: 'Lupu Ankka',
    passwordHash: '$2b$10$dtKdi1.9ZYYQxkwziimBzu7s5GBEI3OjTXCNKV3OsmAS4TRnJ1gzl'
  }
]

const invalidUsers = [
  // Invalid user, property username is missing
  {
    name: 'Roope Ankka',
    password: 'password'
  },
  // Invalid user, property password is missing
  {
    username: 'aku',
    name: 'Aku Ankka',
  },
  // Invalid user, property name is missing
  {
    username: 'aku',
    password: 'password'
  }
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

test('can add a user', async () => {
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

test('password hashes are not returned', async () => {
  const response = await api.get('/api/users')
  response.body.forEach(user => {
    assert.strictEqual(user.passwordHash, undefined)
  })
})

test('if user is missing properties, return 400', async () => {
  for (const newUser of invalidUsers) {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  }
})

after(async () => {
  await mongoose.connection.close()
})
