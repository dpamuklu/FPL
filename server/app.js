var
  express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv"),
  path = require('path'),
  cors = require('cors'),
  functions = require('./functions/function'),
  passport = require("passport"),
  User = require("./models/user"),
  localStrategy = require("passport-local"),
  expressValidator = require("express-validator"),
  passportLocalMng = require("passport-local-mongoose"),
  history = require('connect-history-api-fallback');

const rootDir = path.join(__dirname, '/dist/');
app.use(express.static(rootDir));

dotenv.config();

app.use(history());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use(require("express-session")({
  secret: "vidanjor is my dog",
  resave: false,
  saveUninitialized: false
}));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy({
  usernameField: 'email',
  usernameQueryFields: ['email']
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

setInterval(function() {
  functions.set_subscriber_tasks()
}, 5000) //600000


app.get("/api/all", async function(req, res) {
  var info = await functions.get_data();
  res.json(info);
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post("/register", function(req, res) {

  var newUser = new User({
    email: req.body.email
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect("/");
    });
  });
});

app.listen(process.env.PORT, function() {
  console.log("Server is Running!")
});
