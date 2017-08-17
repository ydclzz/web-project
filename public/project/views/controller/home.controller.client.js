(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);


    function homeController(user,$location,userService,searchService, playlistService, songService) {
        var model = this;
        model.rightPanel = 'search';
        model.user = user;
        model.findMusicians = findMusicians;
        model.changeRightPanel = changeRightPanel;
        model.createPlaylistForUser = createPlaylistForUser;
        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.getAllSongsFromPlaylist = getAllSongsFromPlaylist;
        model.findFollowers = findFollowers;
        model.findSongsByMusician = findSongsByMusician;


        function init() {
            if(model.user.type === 'MUSICIAN') {
                model.rightPanel = 'my-songs';
            }
            findMusicians();
            findPlaylists();
        }
        init();


        function findMusicians() {
            userService.findFollowingByTypeByUser(user._id, 'MUSICIAN')
                .then(function (response) {
                    model.followingMusicians = response.data;
                    // console.log(model.followingMusicians);
                })
        }

        function findFollowers() {
            model.rightPanel = 'followers';
            userService.findFollowersByUser(user._id)
                .then(function (response) {
                    model.followers = response.data;
                    console.log(model.followers);
                })
        }

        function findPlaylists() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                    // console.log("model.playlists")
                    // console.log(model.playlists);
                });
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
                    // console.log(model.playlists);
                    model.rightPanel = 'search';
                    $location.url('#!/home');
                })
        }

        function getAllSongsFromPlaylist(playlistId) {
            playlistService.getAllSongsFromPlaylist(playlistId)
                .then(function (response) {
                    model.songs = response.data;
                    model.rightPanel = "songlist";
                    // console.log("getAllSongsFromPlaylist");
                    // console.log(model.songs);
                })
        }

        function findSongsByMusician() {
            model.rightPanel = 'my-songs';
            songService.findAllSongsByUser(model.user._id)
                .then(function (response) {
                    model.musicianSongs = response.data;
                    console.log("findSongById");
                    console.log(model.musicianSongs);
                })
        }



    }
})();