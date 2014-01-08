'use strict';

angular.module('prodDatamanApp')
   .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

		var API_HOST= 'http://ame32.wyrls.net:8111';
		var USER_NAME = 'jacyn';

		$scope.connectDatabase = function() {

			console.log('pumasok');
			if (! $scope.formDbConnection.$valid) {
				return;
			}
			console.log('pumasok');
			
			var postData = {};
			postData.db_connection = $scope.db_connection;
      $http.post(API_HOST + '/init/', postData).
        success(function (data, status) {
					if (data.status) {
						console.log("success", data);
						
						$location.path('/query/');
					}
        }).
        error(function (data, status) {
					console.log("error", data);
        });

		};
  });
