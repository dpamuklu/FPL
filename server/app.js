var express = require('express'),
  app = express(),
  request = require("request"),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv"),
  nodemailer = require("nodemailer"),
  path = require('path'),
  socket = require('socket.io'),
  cors = require('cors');

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const rootDir = path.join(__dirname, '../', 'client/dist/');
app.use(express.static(rootDir));

app.get("/api/all", async function(req, res) {
  var info = await get_data();
  res.json(info);
});

app.get("*", function(req, res) {
  res.redirect('/');
});

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
};

async function send_mail() {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_NAME,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: 'doganpamuklu05@gmail.com',
    to: 'doganpamuklu05@gmail.com',
    subject: 'Silivri FPL',
    html: 'Veriler yenilendi! https://silivri-fpl.herokuapp.com adresinden sonuclar goruntulenebilir!'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  })
}

async function get_usd_rate() {

  return new Promise((resolve, reject) => {
    request({
      url: 'https://api.exchangeratesapi.io/latest?base=USD',
      json: true
    }, function(error, response, body) {
      if (!error) {
        resolve(body.rates.TRY);
      }
    });
  });
}

async function get_data() {

  const usd_price_tl = await get_usd_rate();

  return new Promise((resolve, reject) => {
    request({
        url: 'https://fantasy.premierleague.com/drf/leagues-h2h-standings/342211',
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var teams = body.standings.results,
            league_name = body.league.name,
            fixture = body.matches_next.results;
          results = body.matches_this.results;


          total_prize_usd = 225.03;

          teams.forEach(function(team, index) {
            if (index == 0) {
              team.prize_usd = total_prize_usd * (1 / 2)
            } else if (index == 1) {
              team.prize_usd = total_prize_usd * (1 / 4)
            } else if (index == 2) {
              team.prize_usd = total_prize_usd * (12.5 / 100)
            } else if (index == 3) {
              team.prize_usd = total_prize_usd * (8.5 / 100)
            } else if (index == 4) {
              team.prize_usd = total_prize_usd * (1 / 25)
            };

            if (index <= 4) {
              team.prize_usd = round(team.prize_usd, 2);
              team.prize_tl = round(team.prize_usd * usd_price_tl, 2);
            };
          });
          var info = {
            teams: teams,
            leage_name: league_name,
            fixture: fixture,
            results: results,
          };
          resolve(info);
        };
      }
    );
  });
};

async function get_results_info() {

  return new Promise((resolve, reject) => {
    request({
        url: 'https://fantasy.premierleague.com/drf/leagues-h2h-standings/342211',
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var teams = body.standings.results,
            league_name = body.league.name;


          resolve(info);
        };
      }
    );
  });
};

async function get_fixture_info() {

  return new Promise((resolve, reject) => {
    request({
        url: 'https://fantasy.premierleague.com/drf/leagues-h2h-standings/342211',
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {

          var teams = body.standings.results,
            league_name = body.league.name;

          resolve(info);
        };
      }
    );
  });
};

app.listen(process.env.PORT, function() {
  console.log("SERVER IS RUNNING")
});
