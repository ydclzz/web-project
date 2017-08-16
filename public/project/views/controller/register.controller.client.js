(function () {
    angular
        .module("Musiker")
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var model = this;
        model.register = register;
        function init() {
        }
        init();

        function register(user) {
            if (model.user.password === model.verifypassword) {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        var responseuser = response.data;
                        if (!responseuser||responseuser === "0") {
                            return userService.createUser(user);
                        } else {
                            model.errorMessage = "username already exist";
                            return "exist";
                        }
                    })
                    .then(function(response){
                        if(response && response!=="exist"){
                            user = response.data;
                            $location.url("/user/" + user._id);
                        }
                        else if(response!=="exist"){
                            model.errorMessage = "something goes wrong";
                        }


                    });
            }else{
                model.errorMessage = "password do not match";
                return;
            }
        }
    }
})();