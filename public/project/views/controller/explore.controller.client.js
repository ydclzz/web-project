(function() {
    angular
        .module("Musiker")
        .controller("exploreController", exploreController)

    function exploreController(user, songService, playlistService, $location) {
        var model = this;
        model.user = user;
        model.favourite = "dontlike";
        model.playlistId = "";
        model.getAllSongs = getAllSongs;
        model.findAllCritics = findAllCritics;
        model.addSongToPlaylist = addSongToPlaylist;
        model.favouriteSong = favouriteSong;
        model.dislike = dislike;
        model.getSongCreator = getSongCreator;
        model.getPlaylist = getPlaylist;

        function init() {
            getAllSongs();
            getPlaylist();
        }
        init();

        function getAllSongs() {
            songService.findAllSongs()
                .then(function (response) {
                    // console.log(response.data);
                    return model.songs = response.data;
                })
        }

        function findAllCritics() {
            // model.reviews = reviewService.findAllReviews();
        }

        function addSongToPlaylist() {
            playlistService.addSongToPlaylist(model.playlistId, model.song._id)
                .then(function (response) {
                    $location.url('/explore');
                })
        }

        function favouriteSong(song) {
            model.favourite = "like";
            model.song = song;
            // console.log("song");
            // console.log(model.song);

        }

        function getSongCreator() {
            songService.getSongCreator(model.song._id)
                .then(function (response) {
                    // console.log(response.data);
                    return model.creator = response.data;
                })
        }

        function getPlaylist() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                    // console.log("model.playlists")
                    // console.log(model.playlists);
                });
        }

        function dislike() {
            model.favourite = "dontlike";
        }
    }


})();