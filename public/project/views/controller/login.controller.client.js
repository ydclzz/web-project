(function () {
    angular
        .module("Musiker")
        .controller("loginController", loginController);

    function loginController($location, $rootScope, userService) {
        var model = this;
        model.login = login;
        function init() {
        }
        init();

        function login(user) {
            userService.findUserByCredentials(user.username, user.password)
                .then(function(response){
                    var userDoc = response.data;
                    if (!userDoc|| userDoc === false) {
                        model.errorMessage = "wrong username or password";
                    } else {
                        $rootScope.currentUser = userDoc;
                        $location.url("user/" + userDoc._id);
                    }
                }, function() {
                    model.errorMessage = "wrong username or password";
                });

        }

    }
})();