/**
 * Created by Chuhan on 8/18/17.
 */
(function () {
    angular
        .module("Musiker")
        .controller("adminEditReviewController", adminEditReviewController);

    function adminEditReviewController($routeParams, $location, reviewService,user) {
        var model = this;
        //variable from path
        model.adminId = user._id;
        model.reviewId = $routeParams["rid"];
        //declare function
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;

        //initial function
        function init() {
            reviewService.findReviewById(model.reviewId)
                .then(function (response) {
                    model.editReview = response.data;
                    console.log(model.editReview);
                });
        }
        init();

        //functions
        function updateReview(review){
            userService.updateReview(model.reviewId, review)
                .then(function (response) {
                    alert("update scceuss")
                });
        }

        function deleteReview(){
            reviewService.deleteReview(model.reviewId);
            $location.url("#!/home");
        }

    }
})();