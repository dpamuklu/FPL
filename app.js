var express     = require('express'),
    app         = express(),
    request     = require("request"),
    bodyParser  = require("body-parser"),
    dotenv      = require("dotenv"),
    nodemailer  = require("nodemailer");

dotenv.config();

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect("standings");
});

app.get("/standings", async function(req, res) {

    var usd_price_tl = await get_usd_rate();
    var info         = await get_standings_info(usd_price_tl);

    teams = info.teams;
    league_name = info.leage_name;

    res.render("standings", {
        teams,
        league_name
    });
});

app.get("/results", async function(req, res) {

    var usd_price_tl = await get_usd_rate();
    var info         = await get_standings_info(usd_price_tl);

    teams = info.teams;
    league_name = info.leage_name;

    res.render("results",
       {
          teams,
          league_name
       }
    );
});

app.get("/fixture", async function(req, res) {

    var usd_price_tl = await get_usd_rate();
    var info         = await get_standings_info(usd_price_tl);

    teams = info.teams;
    league_name = info.leage_name;

    res.render("fixture",
       {
          teams,
          league_name
       }
    );
});

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
};

async function main() {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: '{username}',
                clientId: '{Client ID}',
                clientSecret: '{Client Secret}',
                refreshToken: '{refresh-token}',
                accessToken: '{cached access token}'
            })
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" doganpamuklu05@gmail.com', // sender address
        to: "doganpamuklu05@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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

async function get_standings_info(usd_price_tl) {

    return new Promise((resolve, reject) => {
        request({
                url: 'https://fantasy.premierleague.com/drf/leagues-h2h-standings/342211',
                json: true
            },
            function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    var teams       = body.standings.results,
                        league_name = body.league.name;

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
                    var info = { teams : teams,
                                 leage_name: league_name
                               };
                    resolve(info);
                };
            }
        );
    });
};

app.listen(process.env.PORT , function() {
  console.log("SERVER IS RUNNING")
});
