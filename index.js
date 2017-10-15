const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())

require('./routes/api-routes')(app)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => (
  /* eslint-disable no-console */
  console.log(`Server listening on port ${PORT} \n`)
))
