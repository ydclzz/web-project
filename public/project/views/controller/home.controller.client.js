(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);

    function homeController(user, userService) {
        var model = this;
        model.rightPanel = 'search';
        model.user = user;
        model.findFollower = findFollower;
        model.changeRightPanel = changeRightPanel;
        function init() {
            model.followers = findFollower();
        }
        init;


        function findFollower() {
            return userService.findFollowersByUser(user._id);
        }

        function changeRightPanel(mode) {
            model.rightPanel = mode;
        }
    }
})();