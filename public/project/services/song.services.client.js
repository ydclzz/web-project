(function () {
    angular
        .module("Musiker")
        .service("songService", songService);


    function songService($http) {

        var api =  {
            "createSongForUser": createSongForUser,
            "findSongById": findSongById,
            "findSongBySongName":findSongBySongName,
            "findAllSongsByUser": findAllSongsByUser,
            "updateSong": updateSong,
            "deleteSong": deleteSong,
            "findAllSongs": findAllSongs,
            "getSongCreator":getSongCreator,
            "addSongOwner": addSongOwner,
        };
        return api;


        function findSongById(songId) {
            var url = "/projectapi/song/" + songId;
            return $http.get(url);
        }

        function findAllSongsByUser(userId) {
            var url = "/projectapi/user/" + userId + "/song";
            return $http.get(url);
        }

        function createSongForUser(userId, song) {
            var url = "/projectapi/user/" + userId + "/song";
            return $http.post(url, song);
        }

        function findSongBySongName(songname) {
            var url = "/projectapi/song?songname="+songname;
            return $http.get(url);
        }

        function updateSong(songId,song){
            var url = "/projectapi/song/" + songId;
            return $http.put(url,song);
        }

        function deleteSong(userId, songId){
            var url = "/projectapi/user/" + userId + "/song/" + songId;
            return $http.delete(url);
        }

        function findAllSongs() {
            var url = "/projectapi/songs";
            return $http.get(url);
        }

        function getSongCreator(songId) {
            var url = "/projectapi/song/" + songId + "/creator";
            return $http.get(url);
        }


        function addSongOwner(songId, ownerId, price) {
            var url = "/projectapi/song/" + songId + "/owner/" + ownerId + "/price/" + price;
            console.log(url);
            return $http.put(url);
        }
    }

})();