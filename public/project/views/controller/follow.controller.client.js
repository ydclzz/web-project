
(function() {
    angular
        .module("Musiker")
        .controller("followController", followController)

    function followController($routeParams,$location, userService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];

        //declare function
        model.searchUser = searchUser;
        model.followUser = followUser;
        //initial function
        function init() {
            userService.findFollowersByUser(model.userId)
                .then(function (response) {
                    model.followers = response.data;
                });

            userService.findFollowingByUser(model.userId)
                .then(function (response) {
                    model.followings = response.data;
                });
        }
        init();

        //functions
        function searchUser(userid) {
            userService.findUserByUsername(userid)
                .then(function (response) {
                    model.searchresult = response.data;
                })
        }

        function followUser() {
            userService.findUserByUsername(userid)
                .then(function (response) {
                    model.searchresult = response.data;
                })
        }

    }

})();