var app = require("../../express");
var userModel = require("../model/user.model.server");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// http handlers
app.post("/projectapi/user", createUser);
app.post("/projectapi/login", passport.authenticate('local'), login);
app.get("/projectapi/user", findUser);
app.get("/projectapi/user/:userId", findUserById);
app.get("/projectapi/following", findFollowingByUser);
app.get("/projectapi/follower", findFollowersByUser);
app.get("/projectapi/checkLogin", checkLogin);
app.put("/projectapi/user/:userId", updateUser);
app.put("/projectapi/user/:userId/song/:songId", addSong);
app.put("/projectapi/user/userId/following/:followingId", addFollowingByUser);
app.put("/projectapi/user/userId/follower/:followerId", addFollowerByUser);
app.delete("/projectapi/user/:userId", deleteUser);
// app.delete("/projectapi/user/song/:songId", removeSong);


function createUser(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findUser(req,res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user === null){
                console.log("None");
                return res.send("0");
            }
            else
                return res.json(user);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel
        .deleteUserById(userId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function removeSong(req,res) {
    var userId = req.query.userId;
    var songId = req.params.songId;
    userModel
        .removeSong(userId,songId)
        .then(function (status) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addSong(req,res) {
    var userId = req.params.userId;
    var songId = req.params.songId;
    userModel
        .addSong(userId,songId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function findFollowingByUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findFollowingByUser(userId)
        .then(function (follwing) {
            res.json(follwing);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowersByUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findFollowersByUser(userId)
        .then(function (follwer) {
            res.json(follwer);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function addFollowerByUser(req, res) {
    var userId = req.params.userId;
    var followerId = req.params.followerId;
    userModel
        .addFollowerByUser(userId,followerId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addFollowingByUser(req,res) {
    var userId = req.params.userId;
    var followingId = req.params.followingId;
    userModel
        .addFollowingByUser(userId,followingId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function login(req, res) {
        var user = req.user;
        res.json(user);
    }

function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                    function(user) {
                            if (!user) {
                                    return done(null, false);
                                }
                            return done(null, user);
                        },
                    function(err) {
                            if (err) {
                                    return done(err);
                                }
                        }
                );
    }

function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

function serializeUser(user, done) {
        done(null, user);
    }

function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                    function (user) {
                            done(null, user);
                        },
                    function (err) {
                            done(err, null);
                        }
                );
}