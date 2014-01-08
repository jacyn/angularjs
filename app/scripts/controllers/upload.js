'use strict';

angular.module('prodDatamanApp')
  .controller('UploadCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

		var API_HOST= 'http://ame32.wyrls.net:8111';
		var USER_NAME = 'jacyn';

		$scope.resetPendingStatements = function() {
			$scope.pendingStatements = [];
		};

		$scope.executeSql = function() {
			if (! $scope.formExecuteSql.$valid) {
				return;
			}

			$scope.pendingStatements = [];
			var statements = $scope.sqlStatement.split(';');

			angular.forEach(statements, function(sql) {
				if (sql) {
					var details = {};
					details.sql_statement = sql;
					details.status = 'pending';
					details.username = USER_NAME;

					$scope.pendingStatements.push(details);
				}

			});

			$scope.executedPendingStatements = false;
		};

		$scope.confirmExecute = function() {

			console.log("confirmed");
			angular.forEach($scope.pendingStatements, function(row) {
				var postData = {};
				postData.data = row;

				console.log(row);
				$http.post(API_HOST + '/upload/', postData).
					success(function (info) {
						row.status = info;
					}).
					error(function (info) {
						row.status = info;
					});
			});

			$scope.executedPendingStatements = true;
		};

		$scope.isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });
