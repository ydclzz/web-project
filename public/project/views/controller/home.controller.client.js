(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);


    function homeController(user,$location,userService,searchService, playlistService) {
        var model = this;
        model.rightPanel = 'search';
        model.user = user;
        //model.findFollower = findFollower;
        model.changeRightPanel = changeRightPanel;
        model.createPlaylistForUser = createPlaylistForUser;
        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.getAllSongsFromPlaylist = getAllSongsFromPlaylist;



        function init() {
            // findMusicians();
            // findFollowers();
            findPlaylists();
        }
        init();


        // function findFollowers() {
        //     userService.findFollowersByUser(user._id)
        //         .then(function (response) {
        //             model.followers = response.data;
        //         })
        // }

        function findPlaylists() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    console.log(response);
                    model.playlists = response.data;
                    console.log("model.playlists")
                    console.log(model.playlists);
                });
        }

        function findMusicians() {
            // playlistService.findAllPlaylistsByUser(user._id)
            //     .then(function (response) {
            //         model.playlists = response.data;
            //     });
        }

        function changeRightPanel(mode) {
            model.rightPanel = mode;
        }


        function searchTrack(song) {
            searchService.searchSong(song)
                .then(function (response) {
                    model.search = response.data.songList;
                })
        }

        function showDetails(song) {
            model.song = song;
        }

        function createPlaylistForUser(playlist) {
            playlistService.createPlaylistForUser(model.user._id, playlist)
                .then(function (response) {
                    model.playlists = response.data;
                    console.log(model.playlists);
                    model.rightPanel = 'search';
                    $location.url('/home');
                })
        }

        function getAllSongsFromPlaylist(playlistId) {
            
        }



    }
})();