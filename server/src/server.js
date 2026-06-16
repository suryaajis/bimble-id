if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('./app')
const { sequelize } = require('./models')
const { startScheduler } = require('./helpers/scheduler')

const PORT = process.env.PORT || 3000

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
    startScheduler()
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  })
