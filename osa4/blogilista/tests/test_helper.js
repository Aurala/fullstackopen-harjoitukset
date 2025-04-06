const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: '67f0e1c07d106a8788ca445f'
  },
  {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: '67f0e1c07d106a8788ca445f'
  },
  {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: '67f0e1c07d106a8788ca445f'
  }
]

const invalidBlogs = [
  // Missing property 'likes', but can be added because it defaults to 0
  {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      user: '67f0e1c07d106a8788ca445f'
  },
  // Broken blog post, property 'title' is missing
  {
      _id: '5a422b891b54a676234d17fa',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      user: '67f0e1c07d106a8788ca445f'
  },
  // Broken blog post, property 'url' is missing
  {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      user: '67f0e1c07d106a8788ca445f'
  }
]

const initialUsers = [
  {
    username: 'tupu',
    name: 'Tupu Ankka',
    password: 'tupupass',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ]
  },
  {
    username: 'hupu',
    name: 'Hupu Ankka',
    password: 'hupupass',
    blogs: []
  },
  {
    username: 'lupu',
    name: 'Lupu Ankka',
    password: 'lupupass',
    blogs: []
  }
]

const invalidUsers = [
  // Missing username
  {
    name: 'Aku Ankka',
    password: 'akupass' 
  },
  // Missing password
  {
    username: 'aku',
    name: 'Aku Ankka' 
  },
  // Missing name
  {
    username: 'aku',
    password: 'akupass' 
  },
  // Username too short
  {
    username: 'ak',
    name: 'Aku Ankka',
    password: 'akupass'
  },
  // Password too short
  {
    username: 'aku',
    name: 'Aku Ankka',
    password: 'ak' 
  },
  // Username not unique
  {
    username: 'tupu',
    name: 'Tupu Ankka',
    password: 'akupass'
  }
]

const initializeUsers = async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password || 'password', 10)
    const userObject = new User({
      ...user,
      passwordHash
    })
    await userObject.save()
  }
}

const initializeBlogs = async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
}

module.exports = {
  initialBlogs,
  invalidBlogs,
  initialUsers,
  invalidUsers,
  initializeBlogs,
  initializeUsers
}
