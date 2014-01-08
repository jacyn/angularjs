'use strict';

angular.module('prodDatamanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
	'ngGrid'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/query/', {
        templateUrl: 'views/query.html',
        controller: 'QueryCtrl'
      })
      .when('/add/:tableName/', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
      .when('/edit/:tableName/:id/', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/table', {
        templateUrl: 'views/table.html',
        controller: 'TableCtrl'
      })
      .when('/database', {
        templateUrl: 'views/database.html',
        controller: 'DatabaseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

			//$locationProvider.html5Mode(true).hashPrefix('');
  });

