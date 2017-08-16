(function () {
    angular
        .module("Musiker")
        .controller("loginController", loginController);

    function loginController($location, $rootScope, userService) {
        var model = this;
        model.flag = false;
        model.login = login;
        model.toggle = toggle;
        model.register = register;

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

        function toggle() {
            if(model.flag == true) {
                model.flag = false;
            } else {
                model.flag = true;
            }
        }

        function register(user) {
            if (user.password === user.secondPassword) {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        if (!response.data || response.data === "0") {
                            return userService.createUser(user);
                        } else {
                            model.errorRegisterMessage = "username already exist";
                            return "exist";
                        }
                    })
                    .then(function(response){
                        if(response && response !== "exist"){
                            user = response.data;
                            $location.url("/user/" + user._id);
                        }
                        else if(response !== "exist"){
                            model.errorRegisterMessage = response;//"something goes wrong";
                        }
                    });
            } else {
                model.errorRegisterMessage = "password do not match";
                return;
            }
        }

    }
})();