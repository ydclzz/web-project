(function () {
    angular
        .module("Musiker")
        .controller("songController", songController);

    function songController(songService, playlistService, $routeParams,$location, user) {
        var model = this;
        model.user = user;
        model.findSongInfo = findSongInfo;
        model.addSong = addSong;
        model.reviewSong = reviewSong;
        model.modifySong = modifySong;
        model.addSongToPlaylist = addSongToPlaylist;
        model.favouriteSong = favouriteSong;
        model.getSongCreator = getSongCreator;
        model.getPlaylist = getPlaylist;

        var songId = $routeParams["songId"];
        model.favourite = "no";
        model.playlistId = "";
        function init() {
            findSongInfo();
            getPlaylist();
        }
        init();

        function findSongInfo() {
            songService.findSongById(songId)
                .then(function (response) {
                    model.song = response.data;
                })
        }

        function addSong(song) {

        }

        function modifySong(song) {

        }

        function reviewSong(review) {

        }

        function addSongToPlaylist() {
            playlistService.addSongToPlaylist(model.playlistId, songId)
                .then(function (response) {
                    $location.url('/explore');
                })
        }

        function favouriteSong(option) {
            model.favourite = option;

        }

        function getSongCreator() {
            songService.getSongCreator(songId)
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
    }
})();