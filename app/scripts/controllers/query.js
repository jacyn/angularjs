'use strict';

angular.module('prodDatamanApp')
  .controller('QueryCtrl', function ($scope, $http, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

		var API_HOST= 'http://ame32.wyrls.net:8111';
		var USER_NAME = 'jacyn';
		$scope.MEDIATYPE = {
			'CPIC'              : 'mms',
			'DISNEY[DIS-BAMBI]' : '',
			'MYFREECARSL'       : '',
			'MYFREECARSMMS'     : '',
			'MYFREECARSTC'      : '',
			'NLOGO'             : 'logo',
			'NMMS'              : 'mms',
			'NPIC'              : 'picture',
			'NTONE'             : '',
			'POLY'              : '',
			'TXT'               : '',
			'WORDLOGO'          : ''
		};

		$scope.resetScopeVariables = function() {
			$scope.pendingChanges = [];
			$scope.pendingDelete = [];
			$scope.newVal = [];
			$scope.oldVal = [];
			$scope.data = undefined;
			$scope.table = undefined;
			$scope.query = undefined;
		};

		$scope.resetPendingChanges = function() {
			$scope.pendingChanges = [];
			$scope.pendingDelete = [];
		};

		$scope.resetScopeVariables();

		$scope.addRow = function() {
			console.log("add row");

					if ($scope.table) {
						var addEntry = {};

						angular.forEach($scope.table.results, function(row){
							addEntry[row.Field] = '';
						});
						var index = $scope.data.results.length;
						addEntry['index'] = index;
						$scope.data.results.push(addEntry);

						$scope.$watch('data.results.' + index, function(newVal, oldVal) {
							if (angular.isUndefined(newVal) || newVal === null) { return; }
							if (angular.isUndefined(oldVal) || oldVal === null) { return; }

							$scope.newVal[index] = newVal;
							$scope.oldVal[index] = oldVal;

						}, true);

					}

		};


    $scope.submitQuery = function() {
			if (! $scope.formQuery.$valid) {
				return;
			}

      $http.get(API_HOST + '/describe/' + $scope.query.tableName + '/').
        success(function (data, status) {
          $scope.table = data;
          $scope.status = status;
        }).
        error(function (data, status) {
          $scope.table = data;
          $scope.status = status;
        });

      $http.post(API_HOST + '/select/' + $scope.query.tableName + '/', $scope.query).
        success(function (data, status) {

          var index = 0;
          angular.forEach(data.results, function(row){
            row.index = index++;

						$scope.$watch('data.results.' + row.index, function(newVal, oldVal) {
							if (angular.isUndefined(newVal) || newVal === null) { return; }
							if (angular.isUndefined(oldVal) || oldVal === null) { return; }

							$scope.newVal[newVal.index] = newVal;
							$scope.oldVal[oldVal.index] = oldVal;

							//console.log($scope.newVal, $scope.oldVal);
						}, true);

          });

          $scope.data = data;
          $scope.status = status;
        }).
        error(function (data, status) {
          $scope.data = data;
          $scope.status = status;
        });

      $scope.setReverse(true);
      $scope.setPredicate('id');

    };

    $scope.setPredicate = function(value, order) {
      if (!order) { order = ''; }
      $scope.predicate = order + value;
      $scope.setReverse($scope.predicate === value && !$scope.reverse);
    };

    $scope.setReverse = function(value) {
      $scope.reverse = value;
    };

    var editable  = {};
    $scope.enableEdit = function(id, field) {
      editable[id] = {};
      editable[id][field] = true;
      $scope.edit = editable;
    };

    $scope.disableEdit = function(id, field) {
      editable[id] = {};
      editable[id][field] = false;
      $scope.edit = editable;
    };

    $scope.applyChanges = function() {
			var pending = [];
			angular.forEach($scope.newVal, function(row) {
				if ($scope.newVal[row.index] !== $scope.oldVal[row.index]) {
					var details = {};
					details.table = $scope.query.tableName;
					details.status = 'pending';
					details.action = 'insert';
					if (row.id) {	details.action = 'update'; }
					details.values = row;
					details.username = USER_NAME;

					if (Object.keys(details).length > 0) {
						pending[row.index] = details;
					}
				}
			});

			angular.forEach($scope.pendingDelete, function(value, key) {
				if (value) {
					console.log(key, value);
					console.log($scope.data.results[key]);

					var details = {};
					var row = $scope.data.results[key];
					details.table = $scope.query.tableName;
					details.status = 'pending';
					details.action = 'delete';
					details.values = row;
					details.username = USER_NAME;

					pending[row.index] = details;
				}
				
			});

			for (var i = pending.length - 1; i >= 0; i--) {
				if (pending[i] == null) { pending.splice(i, 1); }
			}
			$scope.pendingChanges = pending;

			$scope.executedPendingChanges = false;

    };

		$scope.confirmChanges = function() {
      angular.forEach($scope.pendingChanges, function(row){
				var postData = {};
				postData.data = row;
				$http.post(API_HOST + '/' + row.action + '/' + row.table + '/', postData).
					success(function (info) {
						row.status = info;
						$scope.pendingDelete = [];
						$scope.submitQuery();
					}).
					error(function (info, status) {
						row.status = status;
					});
			});

			$scope.executedPendingChanges = true;
		};

  })
  .directive ('unfocus', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attribs) {
        element[0].focus();
        element.bind ('blur', function() {
          scope.$apply(attribs.unfocus);
        });
      }
    };
  });
