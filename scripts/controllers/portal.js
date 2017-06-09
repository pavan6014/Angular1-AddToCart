var portal = angular.module('portal', ['ngRoute', 'ui.bootstrap','ngAnimate','ngCart', 'angularUtils.directives.dirPagination']);
portal.controller('MainController', function($scope, $route, $routeParams, $location, $uibModal,$rootScope) {

     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;

     $scope.title = 'CTP Portal';

     $scope.loggedIn = false;

     $scope.login = function(){
        $scope.loggedIn = true;
     };

     $scope.logout = function(){
        $scope.loggedIn = false;
     };

     $scope.changeItemActive = function(option){
         $scope.itemActive = option;
     };

});

portal.config(function ($routeProvider, $locationProvider, $provide) {
    $routeProvider
     .when('/:module/:action', {
        controller: 'RouteCtrl',
        templateUrl: function(params){
            if (params.action === 'logout'){
                return 'views/service/landing.html';
            } else{
                return 'views' + '/' + params.module + '/' + params.action + '.html'
            }
        }
     }).when('/account/signUp',{
            templateUrl:'views/account/signUp.html'
     })
     .when('/service/purchase',{
                controller: 'PurchaseCtrl',
                templateUrl: 'views/service/purchase.html'
      })
      .when('maintenance/customerWizard',{
          templateUrl: 'views/maintenance/customerWizard.html'
      })
      .when('service/productDetails',{
                templateUrl: 'views/service/productDetails.html'
       })
       .when('service/dashboard',{
              templateUrl: 'views/service/dashboard.html'
         })
        .when('service/bills',{
              templateUrl: 'views/service/bills.html'
        })
        .when('admin/customers',{
              templateUrl: 'views/admin/customers.html'
        })
    .otherwise({
         templateUrl: 'views/service/landing.html'
    });

     // configure html5 to get links working on jsfiddle
     $locationProvider.html5Mode(true);

});

portal.controller('RouteCtrl', function($scope, $routeParams) {
     if ($routeParams.action === 'logout'){
        $scope.logout();
     }
     if ($routeParams.action === 'existing'){
        $scope.loadAccount($scope.queryBy.tpiaNo);
     }
});

portal.controller('tabFormController', ['$scope', '$http', 'ngCart', '$uibModal', function($scope, $http, ngCart ,$uibModal) {
    $scope.max = 5;
    $scope.step = 1;
    $scope.changeActive = 0;

    $scope.continueFunction = function(selectedStep){
        $scope.step = selectedStep;
        $scope.changeActive = selectedStep-1;
    };
    
    $scope.submitForm = function(user){
        $scope.userDetails = user;
        $http({
                method : 'POST',
                url : 'adapterClient',
               data : $scope.userDetails
              //  data: JSON.stringify($scope.userDetails)
        }).success(function(data) {     	  
        	 var doc = $.parseXML(data);
             $scope.accNo = doc.childNodes[0].firstChild.textContent;
             $scope.transStatus = doc.childNodes[0].childNodes[3].textContent;
             $scope.submitted = true;
             ngCart.empty();
        }).error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
        });
    };
    
}]);

/* Add to cart functionality */
portal.controller ('cartCtrl', ['$scope', '$http', 'ngCart','$rootScope','store' ,function($scope, $http, ngCart,$rootScope,store) {
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);

    $scope.addToCart = function(index){
        $scope.selectedIndex = index;
        $scope.prodSel = true;
    };
    
    $scope.$on('ngCart:itemRemoved',function(event, args) {
        setTimeout(function() {
            scope.$apply(function() {
                $scope.prodSel =false;
            });
        },0);
    });
}]);


/* Table with pagination and sorting */
portal.controller('tablePaginationSorting',function($scope, $http){
	$scope.users = [
            {"id":1,"first_name":"Heather","last_name":"Bell","email":"heather@ctp.com","phone_number":"8888885555"},
            {"id":2,"first_name":"Andrea","last_name":"Dean","email":"andrea@ctp.com","phone_number":"8888885555"},
            {"id":3,"first_name":"Peter","last_name":"Barnes","email":"peter@ctp.com","phone_number":"8888885555"},
            {"id":4,"first_name":"Harry","last_name":"Bell","email":"harry@ctp.com","phone_number":"8888885555"},
            {"id":5,"first_name":"Deborah","last_name":"Burns","email":"deborah@ctp.com","phone_number":"8888885555"},
            {"id":6,"first_name":"Larry","last_name":"Kim","email":"larry@ctp.com","phone_number":"8888885555"},
            {"id":7,"first_name":"Jason","last_name":"Wallace","email":"jason@ctp.com","phone_number":"8888885555"},
            {"id":8,"first_name":"Carol","last_name":"Williams","email":"carol@ctp.com","phone_number":"8888885555"},
            {"id":9,"first_name":"Samuel","last_name":"Olson","email":"samuel@ctp.com","phone_number":"8888885555"},
            {"id":10,"first_name":"Donna","last_name":"Evans","email":"donna@ctp.com","phone_number":"8888885555"},
            {"id":11,"first_name":"Lois","last_name":"Butler","email":"lois@ctp.com","phone_number":"8888885555"},
            {"id":12,"first_name":"Daniel","last_name":"Hill","email":"daniel@ctp.com","phone_number":"8888885555"},
            {"id":13,"first_name":"Matthew","last_name":"Torres","email":"matthew@ctp.com","phone_number":"8888885555"},
            {"id":14,"first_name":"Jerry","last_name":"Hernandez","email":"jerry@ctp.com","phone_number":"8888885555"},
            {"id":15,"first_name":"Christopher","last_name":"Carpenter","email":"christopher@ctp.com","phone_number":"8888885555"},
            {"id":16,"first_name":"Harold","last_name":"West","email":"harold@ctp.com","phone_number":"8888885555"},
            {"id":17,"first_name":"Carol","last_name":"Hicks","email":"carol@ctp.com","phone_number":"8888885555"},
            {"id":18,"first_name":"Bonnie","last_name":"Davis","email":"bonnie@ctp.com","phone_number":"8888885555"},
            {"id":19,"first_name":"Nancy","last_name":"Banks","email":"nancy@ctp.com","phone_number":"8888885555"},
            {"id":20,"first_name":"Walter","last_name":"Freeman","email":"walter@ctp.com","phone_number":"8888885555"},
            {"id":21,"first_name":"Louis","last_name":"Gonzales","email":"louis@ctp.com","phone_number":"8888885555"},
            {"id":22,"first_name":"Jean","last_name":"Watkins","email":"jean@ctp.com","phone_number":"8888885555"},
            {"id":23,"first_name":"Albert","last_name":"Harris","email":"albert@ctp.com","phone_number":"8888885555"},
            {"id":24,"first_name":"Billy","last_name":"Owens","email":"billy@ctp.com","phone_number":"8888885555"},
            {"id":25,"first_name":"Russell","last_name":"Patterson","email":"russell@ctp.com","phone_number":"8888885555"}
    ]

	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}
});


portal.controller('custDetailsResponseCtrl',['$scope','$uibModalInstance', '$rootScope', function($scope, $uibModalInstance, $rootScope){
    $scope.brmResponse = $rootScope.brmResponse;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);



