'use strict';

angular.module('prodDatamanApp')
 .directive('selectTable', function() {
		var API_HOST= 'http://ame32.wyrls.net:8111';
		var DB_NAME = 'ppp';

		return ({
			restrict: 'E',
			require: '^ngModel',
			templateUrl: '/dataman/views/table.html',
			controller: ['$scope', '$http', function($scope, $http) {

				$http.get(API_HOST + '/show/tables/' + DB_NAME + '/').
					success(function (data) {
						$scope.tables = data;
					}).
					error(function (data) {
						$scope.tables = data;
					});

				$scope.$watch('query.tableName', function(newVal, oldVal) {
					if (angular.isUndefined(newVal) || newVal === null) { return; }
					if (angular.isUndefined(oldVal) || oldVal === null) { return; }

					if ($scope.newVal !== $scope.oldVal) {
						//$scope.resetScopeVariables();
					}

				}, true);
	
		  }],
    });
  })
  .controller('TableCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
