if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const http = require('http')
const app = require('./app')
const { sequelize } = require('./models')
const { initStudyRooms } = require('./helpers/studyRooms')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
initStudyRooms(server)

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.')
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  })
