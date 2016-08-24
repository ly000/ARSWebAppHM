var app = angular.module('ARSApp', ['ngRoute']).run(function($rootScope, $http){
	$rootScope.authenticated = false;
	$rootScope.current_user = "";

	$rootScope.signout = function(){
		$http.get('/auth/signout');

		$rootScope.authenticated = false;
		$rootScope.current_user = "";
	}
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'mainsnippet.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'loginsnippet.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'registersnippet.html',
			controller: 'authController'
		});
});

app.factory('postService', function($http){
	var factory = {};
	factory.getAll = function(){
		return $http.get('/api/posts')
	}
	return factory;
});

app.controller('mainController', function($scope, postService){
	$scope.posts = [];
	$scope.newPost = {created_by: '', text: '', created_at: ''};

	postService.getAll().success(function(data){
		$scope.posts = data;
	})

	$scope.post = function(){
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = {created_by: '', text: '', created_at: ''};
	};
});

app.controller('authController', function($scope, $rootScope, $http ,$location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.current_user = data.user.username;

			$location.path('/')
		})
		//$scope.error_message = 'login request for ' + $scope.user.username;
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.current_user = data.user.username;

			$location.path('/')
		})
		//$scope.error_message = 'registration request for ' + $scope.user.username;
	};
});
