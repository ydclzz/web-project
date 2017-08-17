(function () {
    angular
        .module("Musiker")
        .controller("songController", songController);

    function songController(songService, $routeParams, user) {
        var model = this;
        model.user = user;
        model.findSongInfo = findSongInfo;
        model.addSong = addSong;
        model.reviewSong = reviewSong;
        model.modifySong = modifySong;
        var songId = $routeParams["songId"];
        function init() {
            findSongInfo();
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
    }
})();