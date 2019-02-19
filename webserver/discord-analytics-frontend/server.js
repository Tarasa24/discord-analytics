const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var fs = require('fs')

const port = process.env.PORT_frontend
const app = express()

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use(bodyParser.json())
app.use(cors())

app.get('/data/list', function(req, res) {
  const folder = path.join(__dirname + '/website/data')
  var file_list = []

  fs.readdirSync(folder).forEach(file => {
    file_list.push(file)
  });

  res.send(file_list)
});

app.use("/js" ,express.static(path.join(__dirname, '/website/js')));
app.use("/css" ,express.static(path.join(__dirname, '/website/css')));
app.use("/media" ,express.static(path.join(__dirname, '/website/media')));
app.use("/data" ,express.static(path.join(__dirname, '/website/data')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/website/index.html'));
});

app.get('/env', function(req, res) {
  res.send(process.env.PORT_backend);
});

app.listen(port, () => console.log(`<discord_analytics_frontend> listening on port ${port}!`))
