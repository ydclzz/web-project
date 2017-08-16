(function () {
    angular
        .module("Musiker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/templates/search.html",
                controller: "searchController",
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
            .when("/profile", {
                templateUrl: "views/templates/user-home.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/home", {
                templateUrl: "views/templates/home.html",
                controller: "homeController",
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

