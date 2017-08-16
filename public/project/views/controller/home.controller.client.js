(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);

    function homeController(user) {
        var model = this;
        model.user = user;
    }
})();