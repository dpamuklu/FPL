var express    = require('express'),
    app        = express(),
    bodyParser = require("body-parser"),
    dotenv     = require("dotenv"),
    path       = require('path'),
    cors       = require('cors'),
    functions  = require('./functions/function'),
    history    = require('connect-history-api-fallback');

const rootDir       = path.join(__dirname, '/dist/')
      refreshTimeMs = 600000;

dotenv.config();

app.use(express.static(rootDir));
app.use(history());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

setInterval(function() {
  functions.set_subscriber_tasks()
}, refreshTimeMs)

app.get("/api/all", async function(req, res) {
  var info = await functions.get_data();
  res.json(info);
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT, function() {
  console.log("Server is Running!")
});
