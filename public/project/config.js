(function () {
    angular
        .module("Musiker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
<<<<<<< Updated upstream
            .when("/search", {
                templateUrl: "views/templates/search.html",
                controller: "searchController",
=======
            .when("/", {
                // templateUrl: "views/templates/search.html",
                // controller: "searchController",
                // controllerAs: "model"
                templateUrl: "views/templates/login.html",
                controller: "loginController",
>>>>>>> Stashed changes
                controllerAs: "model"
            })
            .when("/play", {
                templateUrl: "views/templates/play.html"
            })
            .when("/", {
                templateUrl: "views/templates/login.html",
                controller: "loginController",
                controllerAs: "model"
            })
<<<<<<< Updated upstream
            .when("/profile", {
                templateUrl: "views/templates/user-home.html",
=======
            .when("/user/:uid", {
                templateUrl: "views/templates/userHome.html",
>>>>>>> Stashed changes
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
<<<<<<< Updated upstream
            .when("/home", {
                templateUrl: "views/templates/home.html",
                controller: "homeController",
=======
            .when("/user/:uid/edit", {
                templateUrl: "views/templates/profile.html",
                controller: "profileController",
>>>>>>> Stashed changes
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/:uid/follow", {
                templateUrl: "views/templates/follow.html",
                controller: "followController",
                controllerAs: "model"
            })
            .when("/user/:uid/song", {
                templateUrl: "views/templates/song.html",
                controller: "songController",
                controllerAs: "model"
            })
            .when("/user/:uid/playlist/new", {
                templateUrl: "views/templates/playlist-new.html",
                controller: "playlistNewController",
                controllerAs: "model"
            });

        function checkLogin(userService, $q, $location) {
            var deferred = $q.defer();
            userService
                .checkLogin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve(user);
                    }
                })
            return deferred.promise;
        }
    }
}());

