angular.module('gestionApp', ['gestionApp.controllers','ngRoute', 'ngCordova'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html'
			})
			.when('/employe', {
				templateUrl: 'views/employe/employeList.html',
				controller: 'gestionCtrl',
				controllerAs: 'ctrl'
			})
			.when('/employe/:empNum', {
				templateUrl: 'views/employe/employe.html',
				controller: 'modifierEmployeCtrl'
			})
			.when('/employeAdd', {
				templateUrl: 'views/employe/employeAdd.html',
				controller: 'ajoutEmployeCtrl',
				controllerAs: 'ctrl'
			})
			.when('/employeInfo/:empNum', {
				templateUrl: 'views/employe/employeInfo.html',
				controller: 'infoEmployeCtrl',
				controllerAs: 'ctrl'
			})
			.when('/entreprise', {
				templateUrl: 'views/entreprise/entrepriseList.html',
				controller: 'entrepriseCtrl',
				controllerAs: 'ctrl'
			})
			.when('/entreprise/:entNum', {
				templateUrl: 'views/entreprise/entreprise.html',
				controller: 'modifierEntrepriseCtrl'
			})
			.when('/entrepriseAdd', {
				templateUrl: 'views/entreprise/entrepriseAdd.html',
				controller: 'ajoutEntrepriseCtrl',
				controllerAs: 'ctrl'
			})
			.when('/travail/:empNum', {
				templateUrl: 'views/travail/travail.html',
				controller: 'modifierTravailCtrl'
			})
			.when('/travailAdd/:empNum', {
				templateUrl: 'views/travail/travailAdd.html',
				controller: 'ajoutTravailCtrl',
				controllerAs: 'ctrl'
			})
			
			.otherwise({redirectTo: '/'});
	}]);
