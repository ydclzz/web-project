var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.deleteUserById = deleteUserById;
userModel.addSong = addSong;
userModel.removeSong = removeSong;
userModel.findFollowingByUser = findFollowingByUser;
userModel.findFollowersByUser = findFollowersByUser;
userModel.addFollowingByUser = addFollowingByUser;
userModel.addFollowersByUser = addFollowersByUser;
userModel.addReview = addReview;
userModel.removeReview = removeReview;
userModel.addTransaction = addTransaction;
userModel.addPlaylist = addPlaylist;
userModel.removePlaylist = removePlaylist;
module.exports = userModel;



function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.updateOne({_id: userId},
        {$set: user});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUserById(userId) {
    return userModel.findOneAndRemove({_id: userId});
}

//song

function removeSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.songs.indexOf(songId);
            user.songs.splice(index, 1);
            return user.save();
        })
}

function addSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.songs.push(songId);
            return user.save();
        });
}


//Follow
function findFollowingByUser(userId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var following = user.following;
            return userModel.find({ _id: { $in: following } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort docs by the order of their index in widgets.
                    return following.indexOf(a._id) - following.indexOf(b._id);
                });
            });
        })
}

function findFollowersByUser(userId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var followers = user.followers;
            return userModel.find({ _id: { $in: followers } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort docs by the order of their index in widgets.
                    return followers.indexOf(a._id) - followers.indexOf(b._id);
                });
            });
        })
}

function addFollowingByUser(userId, followingId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.following.push(followingId);
            return user.save();
        })
}

function addFollowersByUser(userId, followerId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.followers.push(followerId);
            return user.save();
        })
}

//review
function addReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        });
}

function removeReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        })
}

//transaction
function addTransaction(userId, transactionId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.transactions.push(transactionId);
            return user.save();
        })
}

//playlist
function addPlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.playlists.push(playlistId);
            return user.save();
        })
}

function removePlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.transactions.indexOf(playlistId);
            user.playlists.splice(index, 1);
            return user.save();
        })
}