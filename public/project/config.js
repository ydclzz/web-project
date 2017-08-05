/**
 * Created by Chuhan on 8/4/17.
 */
(function () {
    angular
        .module("Musiker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/album:Id", {
                templateUrl: "views.details/album-details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/details/artist:Id", {
                templateUrl: "views.details/artist-details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/details/song:Id", {
                templateUrl: "views.details/song-details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }
}());

