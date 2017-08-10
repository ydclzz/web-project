var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    songs: [{type: mongoose.Schema.Types.ObjectId, ref:"SongModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    isAdmin: Boolean
}, {collection: "user"});
module.exports = userSchema;