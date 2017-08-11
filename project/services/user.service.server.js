/**
 * Created by Chuhan on 8/11/17.
 */
var app = require("../../express");
var userModel = require("../model/user.model.server");


app.post("/projectapi/user", createUser);
app.get("/projectapi/user", findUser);
app.get("/projectapi/user/:userId", findUserById);
app.put("/projectapi/user/:userId", updateUser);
app.delete("/projectapi/user/:userId", deleteUser);
app.delete("/projectapi/user/:userId/song/:songId", removeSong);
app.post("/projectapi/user/:userId/song/:songId", addSong);
app.get("/projectapi/user/:userId/following", findFollowingByUser);
app.get("/projectapi/user/:userId/follower", findFollowersByUser);

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
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user === null)
                    return res.send("0");
                else
                    return res.json(user);

            }, function (err) {
                return res.sendStatus(404).send(err);
            });
    }
    else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user === null)
                    return res.send("0");
                else
                    return res.json(user);

            }, function (err) {
                return res.sendStatus(404).send(err);
            });
    }
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
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function removeSong(req,res) {
    var userId = req.query.userId;
    var songId = req.params.songId;
    userModel
        .removeSong(userId,songId)
        .then(function (status) {
            res.send(status);
        });
}

function addSong(req,res) {
    var userId = req.query.userId;
    var songId = req.params.songId;
    userModel
        .addSong(userId,songId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
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