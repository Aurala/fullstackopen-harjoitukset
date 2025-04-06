const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongoServer

const connectToMemoryServer = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create()
  }
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
}

const closeMemoryServer = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  }
}

module.exports = {
  connectToMemoryServer,
  closeMemoryServer
}
