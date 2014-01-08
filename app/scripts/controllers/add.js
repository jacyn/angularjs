'use strict';

angular.module('prodDatamanApp')
  .controller('AddCtrl', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tableName = $routeParams.tableName;

    $http.get('http://ame32.wyrls.net:8111/describe/' + $scope.tableName + '/').
      success(function (data, status) {
        $scope.table = data;
        $scope.status = status;
      }).
      error(function (data, status) {
        $scope.table = data;
        $scope.status = status;
      });


    $scope.submitData = function() {
      $http.post('http://ame32.wyrls.net:8111/insert/' + $scope.tableName + '/', $scope.postData).
        success(function (data, status) {
          $scope.response = data;
          $scope.status = status;
        }).
        error(function (data, status) {
          $scope.response = data;
          $scope.status = status;
        });
    };

  });
