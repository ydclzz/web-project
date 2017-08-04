/**
 * Created by Chuhan on 8/4/17.
 */
(function () {
    angular
        .module("spotifyApp")
        .service("spotifyApiService", spotifyApiService);

    function spotifyApiService($http) {
        var model = this;
        model.getAlbumByName = getAlbumByName;
        model.getArtistByName = getArtistByName;
        model.getTrackByName = getTrackByName;


        function getAlbumByName(albumName) {
            var url = "/api/album?albumName= " + albumName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getArtistByName(artistName) {
            var url = "/api/artist?artistName =" +artistName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTrackByName(trackName) {
            var url = "/api/trackName?trackName =" +trackName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();