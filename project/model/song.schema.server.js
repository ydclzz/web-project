var mongoose = require("mongoose");
var songSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    name: String,
    url: String,
    description: String,
    reviews: {type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"},
    dateCreated: {type: Date, default: Date.now}

}, {collection: "song"});
module.exports = songSchema;