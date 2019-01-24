var dotenv = require("dotenv"),
  request = require("request"),
  nodemailer = require("nodemailer"),
  mongoose = require("mongoose"),
  fplJobData = require("../models/fplJobModel"),
  subscriberList = require("../datasource/subscriberList")

dotenv.config()

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals)
}

async function connect_db() {
  await mongoose.connect("mongodb://localhost/silivriFplDB", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
}
//mongodb://localhost/silivriFplDB"

async function set_subscriber_tasks() {

  if (await check_fpl_data_is_changed()) {

    send_mail(subscriberList)

  }
}

async function get_subscribers() {
  return new Promise((resolve, reject) => {
    subscribers.find({},
      function(err, subscriberList) {
        if (err) {
          reject(err)
        } else {
          resolve(subscriberList)
        }
      })
  })
}

async function check_fpl_data_is_changed() {

  const newFplData = await get_fpl_api_infos()

  await connect_db()

  const currentFplData = await get_current_fpl_data()

  const newTotalPoints = await sum_total_points(newFplData.matches_next.results)

  // if no record exist in database, update db with api data and exit
  if (currentFplData.length == 0) {

    await update_with_actual_data(newFplData.matches_next.results[0].event, newTotalPoints)

    const currentFplData = await get_current_fpl_data()

    return false

  }

  if (newFplData.matches_next.results[0].event != currentFplData[0].gameweek) {
    // console.log('week changed')
  } else if (newTotalPoints != currentFplData[0].total_points) {
    // console.log('scores changed')
  }

  if (newFplData.matches_next.results[0].event != currentFplData[0].gameweek ||

    newTotalPoints != currentFplData[0].total_points) {

    await delete_current_data()

    await update_with_actual_data(newFplData.matches_next.results[0].event, newTotalPoints)

    return true

  }
}

async function sum_total_points(results) {
  let totalPoints = 0
  results.forEach(function(element) {
    totalPoints = totalPoints + element.entry_1_points + element.entry_2_points
  });
  return totalPoints
}

async function delete_current_data() {

  return new Promise((resolve, reject) => {
    fplJobData.deleteMany({},
      function(err, oldJob) {
        if (err) {
          reject(err)
        } else {
          resolve(oldJob)
        }
      }
    )
  })
}

async function update_with_actual_data(actualGameweek, totalPoints) {
  return new Promise((resolve, reject) => {
    fplJobData.create({
      "gameweek": actualGameweek,
      "total_points": totalPoints
    }, function(err, newJob) {
      if (err) {
        reject(err)
      } else {
        resolve(newJob)
      }
    })
  })
}

async function get_current_fpl_data() {

  return new Promise((resolve, reject) => {
    fplJobData.find({}, function(err, infos) {
      if (err) {
        reject(err)
      } else {
        resolve(infos)
      }
    })
  })
}

async function get_fpl_api_infos() {
  return new Promise((resolve, reject) => {
    request({
        url: 'https://fantasy.premierleague.com/drf/leagues-h2h-standings/342211',
        json: true
      },
      function(error, response, body) {
        resolve(body)
      }
    )
  })
}

async function send_mail(subscribers) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_NAME,
      pass: process.env.MAIL_PASS
    }
  })

  let toList = "";
  subscribers.forEach(function(subscriber, index) {
    if (index == 0) {
      toList = subscriber
    } else {
      toList = toList + ',' + subscriber
    }
  })

  const mailOptions = {
    from: 'doganpamuklu05@gmail.com',
    to: toList,
    subject: 'Silivri FPL',
    html: 'Veriler yenilendi! https://silivri-fpl.herokuapp.com adresinden sonuclar goruntulenebilir!'
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      console.log(err)
    else
      console.log(info)
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
    })
  })
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
            fixture = body.matches_next.results
          results = body.matches_this.results


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
            league_name: league_name,
            fixture: fixture,
            results: results,
          };
          resolve(info)
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
            league_name = body.league.name


          resolve(info);
        }
      }
    )
  })
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
            league_name = body.league.name

          resolve(info);
        }
      }
    )
  })
}

module.exports = {
  get_data,
  send_mail,
  set_subscriber_tasks
};
