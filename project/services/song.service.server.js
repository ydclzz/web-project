/**
 * Created by Chuhan on 8/11/17.
 */
var app = require("../../express");
var songModel = require("../model/song.model.server");


app.post("/projectapi/user/:userId/song", createSongForUser);
app.get("/projectapi/song", findSongBySongName);
app.get("/projectapi/user/:userId/song", findAllSongsByUser);
app.get("/projectapi/song/:songId", findSongById);
app.put("/projectapi/song/:songId", updateSong);
app.delete("/projectapi/song/:songId", deleteSong);


function createSongForUser(req,res) {
    var song = req.body;
    var userId = req.params.userId;
    songModel
        .createSongForUser(userId, song)
        .then(function (song) {
            res.json(song);
        });
}

function findSongById(req,res) {
    var songId = req.params.songId;
    songModel
        .findSongById(songId)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findSongBySongName(req, res) {
    var songname = req.query.songname;
    songModel
        .findUserByUsername(songname)
        .then(function (song) {
            if (song === null)
                return res.send("0");
            else
                return res.json(song);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function findAllSongsByUser(req, res) {
    var userId = req.params.userId;
    songModel
        .findAllSongsByUser(userId)
        .then(function (songs) {
            res.json(songs);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateSong(req, res){
    var songId = req.params.songId;
    var song = req.body;
    songModel
        .updateSong(songId,song)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteSong(req, res) {
    var songId = req.params.songId;
    songModel
        .deleteSongById(songId)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}