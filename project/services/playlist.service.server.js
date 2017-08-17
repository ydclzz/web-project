var app = require("../../express");
var playlistModel = require("../model/playlist.model.server");



app.post("/projectapi/user/:userId/playlist", createPlaylistForUser);
app.get("/projectapi/playlist", findPlaylistByPlaylistName);
app.get("/projectapi/user/:userId/playlist", findAllPlaylistsByUser);
app.get("/projectapi/playlist/:playlistId", findPlaylistById);
app.put("/projectapi/playlist/:playlistId", updatePlaylist);
app.delete("/projectapi/playlist/:playlistId", deletePlaylist);



function createPlaylistForUser(req,res) {
    var playlist = req.body;
    var userId = req.params.userId;
    playlist._owner = userId;
    playlistModel
        .createPlaylistForUser(userId, playlist)
        .then(function (list) {
            res.json(list);
        });
}

function findPlaylistById(req,res) {
    var listId = req.params.playlistId;
    playlistModel
        .findPlaylistById(listId)
        .then(function (list) {
            res.json(list);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPlaylistByPlaylistName(req, res) {
    var listname = req.query.playlistname;
    playlistModel
        .findPlaylistByPlaylistName(listname)
        .then(function (list) {
            if (list === null)
                return res.send("0");
            else
                return res.json(list);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function findAllPlaylistsByUser(req, res) {
    console.log("gagagagagag");
    var userId = req.params.userId;
    console.log(userId);
    playlistModel
        .findAllPlaylistsByUserId(userId)
        .then(function (lists) {
            console.log(lists);
            res.json(lists);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updatePlaylist(req, res){
    var listId = req.params.playlistId;
    var newlist = req.body;
    playlistModel
        .updatePlaylist(listId,newlist)
        .then(function (list) {
            res.json(list);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deletePlaylist(req, res) {
    var playlistId = req.params.playlistId;
    playlistModel
        .deletePlaylist(playlistId)
        .then(function (list) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}