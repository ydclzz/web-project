(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);

    function homeController(user, userService) {
        var model = this;
        model.user = user;

        model.findFollower = findFollower;

        function init() {
            model.followers = findFollower();
        }
        init;


        function findFollower() {
            return userService.findFollowersByUser(user._id);
        }
    }
})();