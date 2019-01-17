var
  express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv"),
  path = require('path'),
  cors = require('cors'),
  functions = require('./functions/function');

// const
  // rootDir = path.join(__dirname, '../', 'client/dist/');
var rootDir = "";

if (process.env.NODE_ENV === "production") {
  console.log('test');
  app.use(express.static("client/dist")) }
else {
 rootDir = path.join(__dirname, '../', 'client/dist/');
 app.use(express.static(rootDir));
}


dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(rootDir));

app.get("/api/all", async function(req, res) {
  var info = await functions.get_data();
  res.json(info);
});

app.get("*", function(req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT, function() {
  console.log("Server is Running!")
});
