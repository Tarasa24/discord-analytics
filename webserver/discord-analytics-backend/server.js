const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var fs = require('fs')
var path = require('path')
var bot = require('./bot.js')

const port = process.env.PORT_backend
const app = express()

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 },
  skip: function (req, res) { return res.statusCode = 409 }
}))

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use(bodyParser.json())
app.use(cors())


app.get(`/`, send_data)

app.listen(port, () => console.log(`<discord_analytics_backend> listening on port ${port}!`))

async function send_data(request, response) {
  params = request.query
  if (params.id === undefined) {
    response.status(409).send("Parameter <b>ID</b> hasnt been stated")
  }
  else {
    if (params.id.length != 18){
      response.status(409).send("Wrong parameter <b>ID</b>")
    }
    else {
      res = await bot.getData(params.id)
      response.status(res[1]).send(res[0])
    }
  }
}
