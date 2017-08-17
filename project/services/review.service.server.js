var app = require("../../express");
var reviewModel = require("../model/review.model.server");



app.post("/projectapi/user/:userId/song/:songId/review", createReviewForSong);
app.post("/projectapi/user/:userId/playlist/:playlistId/review", createReviewForPlaylist);
app.post("/projectapi/user/:userId/musician/:musicianId/review", createReviewForMusician);
app.get("projectapi/review/:reviewId", findReviewById);
app.get("/projectapi/musician/:musicianId/review", findReviewByMusicianId);
app.get("/projectapi/playlist/:playlistId/review", findReviewByPlaylistId);
app.get("/projectapi/song/:songId/review", findReviewBySongId);
app.get("/projectapi/user/:userId/review", findAllReviewsByUser);
app.put("/projectapi/review/:reviewId", updateReview);
app.delete("/projectapi/review/:reviewId", deleteReview);



function createReviewForSong(req,res) {
    var review = req.body;
    var userId = req.params.userId;
    var songId = req.params.songId;
    reviewModel
        .createReviewForSong(userId, songId,review)
        .then(function (review) {
            res.json(review);
        });
}

function createReviewForPlaylist(req,res) {
    var review = req.body;
    var userId = req.params.userId;
    var playlistId = req.params.playlistId;
    reviewModel
        .createReviewForPlaylist(userId, playlistId,review)
        .then(function (review) {
            res.json(review);
        });
}

function createReviewForMusician(req,res) {
    var review = req.body;
    var userId = req.params.userId;
    var musicianId = req.params.musicianId;
    reviewModel
        .createReviewForMusician(userId, musicianId,review)
        .then(function (review ) {
            res.json(review);
        });
}

function findReviewById(req,res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .findReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findReviewByMusicianId(req,res) {
    var musicianId = req.params.musicianId;
    reviewModel
        .findReviewByMusicianId(musicianId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findReviewBySongId(req,res) {
    var songId = req.params.songId;
    reviewModel
        .findReviewBySongId(songId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findReviewByPlaylistId(req, res) {
    var playlistId = req.params.playlistId;
    reviewModel
        .findReviewByPlaylistId(playlistId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findAllReviewsByUser(req, res) {
    var userId = req.params.userId;
    reviewModel
        .findAllReviewsByUser(userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateReview(req, res){
    var reviewId = req.params.reviewId;
    var newreview = req.body;
    reviewModel
        .updateReview(reviewId,newreview)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .deleteReview(reviewId)
        .then(function (review) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}