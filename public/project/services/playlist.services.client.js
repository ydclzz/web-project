(function () {
    angular
        .module("Musiker")
        .factory("playlistService", playlistService);


    function playlistService($http) {

        var api =  {
            "createPlaylistForUser": createPlaylistForUser,
            "findPlaylistById": findPlaylistById,
            "findPlaylistByPlaylistName":findPlaylistByPlaylistName,
            "findAllPlaylistsByUser": findAllPlaylistsByUser,
            "updatePlaylist": updatePlaylist,
            "deletePlaylist": deletePlaylist
        };

        return api;


        function findPlaylistById(playlistId) {
            var url = "/projectapi/playlist/" + playlistId;
            return $http.get(url);
        }

        function findAllPlaylistsByUser(userId) {
            var url = "/projectapi/user/" + userId + "/playlist";
            return $http.get(url);
        }

        function createPlaylistForUser(userId, playlist) {
            var url = "/projectapi/user/" + userId + "/playlist";
            return $http.post(url,playlist);
        }

        function findPlaylistByPlaylistName(playlistname) {
            var url = "/projectapi/playlist?playlistname="+playlistname;
            return $http.get(url);
        }

        function updatePlaylist(playlistId,playlist){
            var url = "/projectapi/playlist/" + playlistId;
            return $http.put(url,playlist);
        }

        function deletePlaylist(playlistId){
            var url = "/projectapi/playlist/" + playlistId;
            return $http.delete(url);
        }

    }

})();