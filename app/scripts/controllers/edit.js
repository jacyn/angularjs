'use strict';

angular.module('prodDatamanApp')
  .controller('EditCtrl', function ($scope, $http, $routeParams) {
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

    $scope.query = {
      filter: {
        where: 'id = ' + $routeParams.id
      }
    };

    $http.post('http://ame32.wyrls.net:8111/select/' + $scope.tableName + '/', $scope.query).
      success(function (data, status) {
        $scope.data = data;
        $scope.status = status;
      }).
      error(function (data, status) {
        $scope.data = data;
        $scope.status = status;
      });

    $scope.submitData = function(postData) {
      $http.post('http://ame32.wyrls.net:8111/update/' + $scope.tableName + '/', postData).
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
