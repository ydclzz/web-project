(function() {
    angular
        .module("Musiker")
        .controller("exploreController", exploreController)

    function exploreController(user, songService) {
        var model = this;
        model.user = user;
        model.getAllSongs = getAllSongs;
        model.findAllCritics = findAllCritics;

        function init() {
            getAllSongs();
        }
        init();

        function getAllSongs() {
            songService.findAllSongs()
                .then(function (response) {
                    console.log(response.data);
                    return model.songs = response.data;
                })
        }

        function findAllCritics() {
            // model.reviews = reviewService.findAllReviews();
        }
    }


})();