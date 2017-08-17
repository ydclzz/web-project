var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    type: {type: String, enum: ['GENERAL', 'MUSICIAN', 'PUBLISHER', 'ADMIN', 'CRITIC']},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref:"SongModel"}],
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref:"PlaylistModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"}],
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref:"TransactionModel"}],
    // isAdmin: Boolean
}, {collection: "projectusers"});
module.exports = userSchema;