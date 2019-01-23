var mongoose = require("mongoose");

var subscriberSchema = new mongoose.Schema({
	email: String
});

module.exports = mongoose.model("subscriberModel", subscriberSchema);
