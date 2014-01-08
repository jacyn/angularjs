'use strict';

angular.module('prodDatamanApp')
 .directive('selectDatabase', function() {
		var API_HOST= 'http://ame32.wyrls.net:8111';

		return ({
			restrict: 'E',
			require: '^ngModel',
			templateUrl: '/dataman/views/database.html',
			controller: ['$scope', '$http', function($scope, $http) {

				$http.get(API_HOST + '/show/databases/').
					success(function (data) {
						$scope.databases = data;
					}).
					error(function (data) {
						$scope.databases = data;
					});

		  }],
    });
  })
  .controller('DatabaseCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
