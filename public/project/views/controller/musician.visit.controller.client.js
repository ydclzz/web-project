(function () {
    angular
        .module("Musiker")
        .controller("musicianVisitController", musicianVisitController);

    function musicianVisitController(userService, songService, $routeParams, user) {
        var model = this;
        model.user = user;
        var musicianId = $routeParams["musicianId"];
        model.findMusicianInfo = findMusicianInfo;
        model.findMusicianSongs = findMusicianSongs;
        function init() {
            findMusicianSongs();
            findMusicianInfo();
        }
        init();

        function findMusicianSongs() {
            songService.findAllSongsByUser(musicianId)
                .then(function (response) {
                    model.songs = response.data;
                })
        }

        function findMusicianInfo() {
            userService.findUserById(musicianId)
                .then(function (response) {
                    model.musician = response.data;
                })
        }
    }
})();