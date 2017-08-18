(function () {
    angular
        .module("Musiker")
        .controller("songController", songController);

    function songController(songService, playlistService,reviewService, $routeParams,$location, user) {
        var model = this;
        model.user = user;
        model.findSongInfo = findSongInfo;
        model.addSong = addSong;
        model.reviewSong = reviewSong;
        model.editSong = editSong;
        model.updateSong = updateSong;
        model.addSongToPlaylist = addSongToPlaylist;
        model.favouriteSong = favouriteSong;
        model.getSongCreator = getSongCreator;
        model.getPlaylist = getPlaylist;
        model.deleteSong = deleteSong;
        model.addReviewToSong = addReviewToSong;
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

        function editSong() {
            model.edit = 'yes';
        }

        function reviewSong(review) {
            model.editreview = 'yes';
        }

        function addReviewToSong(){
            if(model.newreview.title && model.newreview.comment){
                reviewService.createReviewForSong(user._id, model.song._id, model.newreview)
                    .then(function (res) {
                        alert("success")
                        $location.url('/explore');
                    })
            }else{
                alert("please fill in review");
            }
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

        function updateSong(songname) {
            model.song.name = songname;
            songService.updateSong(model.song._id, model.song)
                .then(function (response) {
                    model.edit = 'no';
                    return init();
                })
        }

        function deleteSong(song) {
            return songService.deleteSong(model.user._id, song._id)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function getPlaylist() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                });
        }
    }
})();