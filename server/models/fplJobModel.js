var mongoose = require("mongoose");

var fplSchema = new mongoose.Schema({
	gameweek: Number ,
	total_points: Number
});

module.exports = mongoose.model("fplJobModel", fplSchema);
