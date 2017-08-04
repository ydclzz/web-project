/**
 * Created by Chuhan on 8/4/17.
 */
(function () {
    angular
        .module("spotifyApp")
        .controller("searchController", searchController);

    function searchController(spotifyApiService) {
        var model = this;

        model.searchAlbum = searchAlbum;
        model.searchArtist = searchArtist;
        model.searchTrack = searchTrack;

        function init() {

        }

        init();

        function searchAlbum(albumName) {
            model.search = spotifyApiService
                .getAlbumByName(albumName);

        }
        function searchArtist(artistName) {
            model.search = spotifyApiService
                .getArtistByName(artistName);

        }
        function searchTrack(trackName) {
            model.search = spotifyApiService
                .getTrackByName(trackName);

        }

        function renderMusics(musics) {
            model.musics = musics;
        }
    }
})();