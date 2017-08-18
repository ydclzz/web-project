var mongoose = require("mongoose");
var songSchema = mongoose.Schema({
    _creator: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    name: String,
    url: String,
    artist: String,
    price: {
        type: Number,
        default: 0,
    },
    playlists: {type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"},
    coverUrl: String,
    description: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now}

}, {collection: "song"});
module.exports = songSchema;