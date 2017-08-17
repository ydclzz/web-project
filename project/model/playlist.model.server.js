var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
var userModel = require("./user.model.server")
var songModel = require("./song.model.server")
var db = require("./database");

playlistModel.createPlaylist = createPlaylist;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.findListByListName = findListByListName;
playlistModel.findAllPlaylistsByUserId = findAllPlaylistsByUserId;
playlistModel.deletePlaylist = deletePlaylist;
playlistModel.updatePlaylist = updatePlaylist;

playlistModel.addReview = addReview;
playlistModel.removeReview = removeReview;
playlistModel.addSongToPlaylist = addSongToPlaylist;
playlistModel.removeSongFromPlaylist = removeSongFromPlaylist;

module.exports = playlistModel;

function createPlaylist(userId, playlist) {
    playlist.owner = userId;
    return playlistModel.create(playlist);
}

function findPlaylistById(playlistId) {
    return playlistModel.findOne({_id: playlistId});
}

function findListByListName(playlistname) {
    return playlistModel.find({name: playlistname});
}

function findAllPlaylistsByUserId(userId) {
    return playlistModel.find({_owner: userId});
}

function deletePlaylist(playlistId) {
    return playlistModel
        .remove({_id: playlistId})
}

function updatePlaylist(playlistId,playlist) {
    return playlistModel
        .updateOne({_id: playlistId},
            {$set: playlist});
}

function addSongToPlaylist(playlistId,songId) {
    return playlistModel.findPlaylistById(playlistId)
        .then(function (list) {
            list.songlist.push(songId);
            return user.save();
        })
}

function removeSongFromPlaylist(playlistId, songId) {
    return playlistModel
        .findById(playlistId)
        .then(function (list) {
            var index = list.songlist.indexOf(songId);
            list.songlist.splice(index, 1);
            return list.save();
        })
}



//review
function addReview(playlistId, reviewId) {
    return playlistModel
        .findById(playlistId)
        .then(function (list) {
            list.reviews.push(reviewId);
            return list.save();
        });
}

function removeReview(playlistId, reviewId) {
    return userModel
        .findById(playlistId)
        .then(function (list) {
            var index = list.reviews.indexOf(reviewId);
            list.reviews.splice(index, 1);
            return list.save();
        })
}