/**
 *  gestionAppModule
 *
 * Description
 */
angular.module('gestionApp')
    .factory('EmployeService', function($cordovaSQLite) {
    	var result = [];

        return {

            getEmployes: function(db) {
                // select employe values
                db.transaction(function(tx) {
					var query = "SELECT numero, nom, adresse, salaire FROM employe";
					tx.executeSql(query, [], function(res) {
						console.log(res);
						return result = res;
					}, function(err) {
						console.log('ERROR');
						console.log(err);
					});
				});
				return result;
            }

        };
    });
