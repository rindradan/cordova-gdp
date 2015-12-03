// database
var db = null;

angular.module('gestionApp.controllers', [])
	.controller('initCtrl', ['$cordovaSQLite', function($cordovaSQLite){

		// if(window.cordova) {
		// 	db = $cordovaSQLite.openDB('gestionEmploye.db');
		// 	var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
		// 	notif.html('Connecté à la base de données. - 1 -');
		// }
		// else {
			db = window.openDatabase('gestionEmploye.db', '1.0', 'My app', -1);
			var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
			notif.html('Connecté à la base de données. - 2 -');
		// }
		
		/*db.transaction(function(tx) {
			var query = "DROP TABLE IF EXISTS employe";
			tx.executeSql(query, [], function(res) {
				console.log('Table employe dropped');
			}, function(err) {
				console.log('ERROR');
				console.log(err);
			});
		});*/
		
		/*db.transaction(function(tx) {
			var query = "DROP TABLE IF EXISTS entreprise";
			tx.executeSql(query, [], function(res) {
				console.log('Table entreprise dropped');
			}, function(err) {
				console.log('ERROR');
				console.log(err);
			});
		});*/
		
		/*db.transaction(function(tx) {
			var query = "DROP TABLE IF EXISTS travail";
			tx.executeSql(query, [], function(res) {
				console.log('Table travail dropped');
			}, function(err) {
				console.log('ERROR');
				console.log(err);
			});
		});*/
		
		// create table employe if not exists
		db.transaction(function(tx) {
			//console.log('create table function');
			var query = "CREATE TABLE IF NOT EXISTS employe (numero varchar(11) not null unique, nom varchar(50), adresse varchar(50), taux double, heuresTotal int(5), num_entreprise varchar(11))";
			tx.executeSql(query, [], function(res) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Table EMPLOYE prête.');

				//console.log('Table created');
			}, function(err) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur lors de la création de la table.<br/>'+err);
				console.log('ERROR');
				console.log(err);
			});
		});
		
		// create table entreprise if not exists
		db.transaction(function(tx) {
			//console.log('create table function');
			var query = "CREATE TABLE IF NOT EXISTS entreprise (numero varchar(11) not null unique, design varchar(50))";
			tx.executeSql(query, [], function(res) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Table ENTREPRISE prête.');

				//console.log('Table created');
			}, function(err) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur lors de la création de la table.<br/>'+err);
				console.log('ERROR');
				console.log(err);
			});
		});
		
		// create table travail if not exists
		db.transaction(function(tx) {
			//console.log('create table function');
			var query = "CREATE TABLE IF NOT EXISTS travail (num_employe varchar(11) not null, nbheures int(5))";
			tx.executeSql(query, [], function(res) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Table TRAVAIL prête.');

				//console.log('Table created');
			}, function(err) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur lors de la création de la table.<br/>'+err);
				console.log('ERROR');
				console.log(err);
			});
		});
		
		// drop trigger travail if exists
		db.transaction(function(tx) {
			var query = "DROP TRIGGER IF EXISTS trig_after_insert_travail;";
			tx.executeSql(query, [], function(res) {
				
			}, function(err) {
				console.log(err);
			});
		});
		db.transaction(function(tx) {
			var query = "DROP TRIGGER IF EXISTS trig_after_update_travail;";
			tx.executeSql(query, [], function(res) {
				
			}, function(err) {
				console.log(err);
			});
		});
		db.transaction(function(tx) {
			var query = "DROP TRIGGER IF EXISTS trig_after_delete_travail;";
			tx.executeSql(query, [], function(res) {
				
			}, function(err) {
				console.log(err);
			});
		});
		// drop trigger employe if exists
		db.transaction(function(tx) {
			var query = "DROP TRIGGER IF EXISTS trig_after_delete_employe;";
			tx.executeSql(query, [], function(res) {
				
			}, function(err) {
				console.log(err);
			});
		});
		// drop trigger entreprise if exists
		db.transaction(function(tx) {
			var query = "DROP TRIGGER IF EXISTS trig_after_delete_entreprise;";
			tx.executeSql(query, [], function(res) {
				
			}, function(err) {
				console.log(err);
			});
		});

		// create trigger travail
		db.transaction(function(tx) {
			var query = "CREATE TRIGGER trig_after_insert_travail AFTER INSERT ON travail FOR EACH ROW  BEGIN UPDATE employe SET heuresTotal = heuresTotal + NEW.nbheures WHERE employe.numero = NEW.num_employe; END";
			tx.executeSql(query, [], function(res) {

			}, function(err) {
				// var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				// notif.html('Erreur lors de la création du trigger.<br/>'+err);
				// console.log('ERROR');
				// console.log(err);
			});
		});
		db.transaction(function(tx) {
			var query = "CREATE TRIGGER trig_after_update_travail AFTER UPDATE ON travail FOR EACH ROW  BEGIN UPDATE employe SET heuresTotal = heuresTotal - OLD.nbheures WHERE employe.numero = NEW.num_employe; UPDATE employe SET heuresTotal = heuresTotal + NEW.nbheures WHERE employe.numero = NEW.num_employe; END";
			tx.executeSql(query, [], function(res) {

			}, function(err) {
				// var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				// notif.html('Erreur lors de la création du trigger.<br/>'+err);
				// console.log('ERROR');
				// console.log(err);
			});
		});
		db.transaction(function(tx) {
			var query = "CREATE TRIGGER trig_after_delete_travail AFTER DELETE ON travail FOR EACH ROW  BEGIN UPDATE employe SET heuresTotal = heuresTotal - OLD.nbheures WHERE employe.numero = OLD.num_employe; END";
			tx.executeSql(query, [], function(res) {

			}, function(err) {
				// var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				// notif.html('Erreur lors de la création du trigger.<br/>'+err);
				// console.log('ERROR');
				// console.log(err);
			});
		});
		// create trigger employe
		db.transaction(function(tx) {
			var query = "CREATE TRIGGER trig_after_delete_employe AFTER DELETE ON employe FOR EACH ROW  BEGIN DELETE FROM travail WHERE travail.num_employe = OLD.numero; END";
			tx.executeSql(query, [], function(res) {

			}, function(err) {
				// var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				// notif.html('Erreur lors de la création du trigger.<br/>'+err);
				// console.log('ERROR');
				// console.log(err);
			});
		});
		// create trigger entreprise
		db.transaction(function(tx) {
			var query = "CREATE TRIGGER trig_after_delete_entreprise AFTER DELETE ON entreprise FOR EACH ROW  BEGIN UPDATE employe SET num_entreprise = null WHERE employe.num_entreprise = OLD.numero; END";
			tx.executeSql(query, [], function(res) {

			}, function(err) {
				// var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				// notif.html('Erreur lors de la création du trigger.<br/>'+err);
				// console.log('ERROR');
				// console.log(err);
			});
		});
		
		
	}])
	.controller('gestionCtrl', function($scope, $http, $cordovaSQLite, $location/*, EmployeService*/) {
		/*setTimeout(function() {
			$("div.panel").removeClass('left').addClass('center');
		}, 50);*/
		$scope.menu = 'employe';
		$scope.panel = 0;

		var self = this;
		$scope.entreprises = [];
		$scope.rech = [];
		$scope.rech.where = "";

		var query = "";

		// select entreprise values
		var query = "SELECT numero, design FROM entreprise ORDER BY numero ASC";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
			// console.log(res);
			if(res.rows.length > 0) {
				for(var i=0 ; i<res.rows.length ; i++) {
					$scope.entreprises.push(res.rows.item(i));
					// console.log("SELECTED -> " + res.rows.item(i).numero + " " + res.rows.item(i).design);
				}
			}
			else {
				console.log('Aucune données sélectionnée');
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-warning show').find('p#notif');
				notif.html('Aucune données ENTREPRISE sélectionnée.');
			}
		}, function(err) {
			var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
			notif.html('Erreur lors de la sélection de données ENTREPRISE.<br/>'+err);
			console.log('ERROR');
			console.log(err);
		});

		// select employe values
		self.changeFiltre = function() {
			$scope.employes = [];
			$scope.employes.sommeSal = 0;
			
			query = "SELECT employe.numero, nom, adresse, taux, heuresTotal, design FROM employe LEFT JOIN entreprise ON employe.num_entreprise=entreprise.numero "+ $scope.rech.where +" ORDER BY employe.numero ASC";
			$cordovaSQLite.execute(db, query, []).then(function(res) {
				//var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				// console.log(res);
				if(res.rows.length > 0) {
					for(var i = 0; i < res.rows.length; i++) {
						$scope.employes.push(res.rows.item(i));
						$scope.employes[i].salaire = res.rows.item(i).heuresTotal * res.rows.item(i).taux;
						$scope.employes.sommeSal += $scope.employes[i].salaire;
						// console.log($scope.employes);

						var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
						notif.html('Données récupérées.');
						// console.log("SELECTED -> " + res.rows.item(i).numero + " " + res.rows.item(i).nom);
					}
					
					
				} else {
					// console.log("Aucune donnée sélectionnée");
					var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-warning show').find('p#notif');
					notif.html('Aucune données EMPLOYE sélectionnée.');
				}

			}, function(err) {
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur lors de la sélection de données EMPLOYE.<br/>'+err);
				console.log('ERROR');
				console.log(err);
			});
			
		}

		self.changeFiltre();
		
		self.linkEdit = function(pathemp) {
			//console.log($location.absUrl()+'/'+pathemp);
			window.location.href = '#/employe/'+pathemp;
		}
		
		self.linkInfo = function(pathemp) {
			//console.log($location.absUrl()+'/'+pathemp);
			window.location.href = '#/employeInfo/'+pathemp;
		}

		//$('div.alert').removeClass('show').addClass('hidden');
		

	})
	.controller('ajoutEmployeCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		self = this;
		var emptyVal = 0;
		$scope.entreprises = [];
		$scope.add = [];
		$scope.add.entrepriseID = "";
/*
		setTimeout(function() {
			$('#employeAdd').removeClass('right').addClass('center');
		}, 50);
*/
	
		var query = "SELECT numero, design FROM entreprise ORDER BY numero ASC";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
			// console.log(res);
			if(res.rows.length > 0) {
				for(var i=0 ; i<res.rows.length ; i++) {
					$scope.entreprises.push(res.rows.item(i));
					// console.log("SELECTED -> " + res.rows.item(i).numero + " " + res.rows.item(i).design);
				}
			}
			else {
				console.log('Aucune données sélectionnée');
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Aucune données ENTREPRISE disponible.');
				
				$("input").each(function() {
					$(this).attr("readonly", true);	
				});
				emptyVal = 1;

			}
		}, function (err) {
				$("input#numero").focus();
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur!');
				$('div.form-group:first').addClass('has-error');
			});

		$("input#numero").focus();

		self.insertEmploye = function() {
			var query = "INSERT INTO employe VALUES (?, ?, ?, ?, ?, ?)";
			$cordovaSQLite.execute(db, query, [$scope.add.numero, $scope.add.nom, $scope.add.adresse, $scope.add.taux, 0, $scope.add.entrepriseID]).then(function(res) {
				/*
				console.log("insertId: " + res.insertId);*/
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Ajout de "'+ $scope.add.nom +'" avec succès.');
				window.location.href = "#/employe";

			}, function (err) {
				$("input#numero").focus();
				if(emptyVal == 0) {
					var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
					notif.html('Erreur : Duplication du numero.');
					console.log(err);
					$('div.form-group:first').addClass('has-error');
				}
			});
			
		}
		
	}])
	.controller('infoEmployeCtrl', ['$scope', '$cordovaSQLite', '$routeParams', function($scope, $cordovaSQLite, $routeParams){
		var self = this;
		$scope.info = [];
		$scope.info.numero = $routeParams.empNum;

		var query = "SELECT emp.numero as emp_numero, emp.nom as nom, emp.adresse as adresse, emp.taux as taux, ent.numero as ent_numero, ent.design as design FROM employe emp LEFT JOIN entreprise ent ON ent.numero=emp.num_entreprise WHERE emp_numero='"+ $scope.info.numero +"'";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
			if(res.rows.length > 0) {
				$scope.info.nom = res.rows.item(0).nom;
				$scope.info.adresse = res.rows.item(0).adresse;
				$scope.info.taux = res.rows.item(0).taux;
				$scope.info.entreprise = res.rows.item(0).design;
				
			} else {
				console.log("Aucune données !");
			}
		}, function (err) {
			console.error(err);
		});

		self.linkEdit = function(pathemp) {
			//console.log($location.absUrl()+'/'+pathemp);
			window.location.href = '#/employe/'+pathemp;
		}
		

	}])
	.controller('supprimerEmployeCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		var employe = [];

		$scope.load = function(d_employe, event) {
			employe = d_employe;
			event.preventDefault();
		}

		$scope.deleteEmploye = function() {

			var query = "DELETE FROM employe WHERE numero=?";
			$cordovaSQLite.execute(db, query, [employe.numero]).then(function(res) {
				
				if($scope.panel == 0) {
					var index = $scope.employes.indexOf(employe);
					$scope.employes.splice(index, 1);
					$scope.employes.sommeSal -= employe.salaire;
				}
				else {
					window.location.href = '#/employe';
				}
				/*
				console.log("DELETED XX " + employe.numero + " " + employe.nom);*/
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Suppression de "'+ employe.nom +'" avec succès.');

				//$('div.alert').removeClass('show');

			}, function (err) {
				console.error(err);
			});
			
		}
		
	}])
	.controller('modifierEmployeCtrl', ['$scope', '$cordovaSQLite', '$routeParams', '$location', function($scope, $cordovaSQLite, $routeParams, $location){
		/*setTimeout(function() {
			$("#employeEdit").removeClass('right').addClass('center');
		}, 50);*/

/*		setTimeout(function() {
*/
		$('input#nom').focus();

		$scope.edit = [];
		$scope.edit.numero = $routeParams.empNum;
		$scope.entreprises = [];
		$scope.panel = 3;

		var query = "SELECT numero, design FROM entreprise ORDER BY numero ASC";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
			// console.log(res);
			if(res.rows.length > 0) {
				for(var i=0 ; i<res.rows.length ; i++) {
					$scope.entreprises.push(res.rows.item(i));
					// console.log("SELECTED -> " + res.rows.item(i).numero + " " + res.rows.item(i).design);
				}
			}
			else {
				console.log('Aucune données sélectionnée');
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Aucune données ENTREPRISE disponible.');
				
				$("input").each(function() {
					$(this).attr("readonly", true);	
				});
				emptyVal = 1;

			}
			}, function (err) {
				$("input#numero").focus();
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur!');
				$('div.form-group:first').addClass('has-error');
			});


			var query = "SELECT emp.numero as emp_numero, emp.nom as nom, emp.adresse as adresse, emp.taux as taux, ent.numero as ent_numero, ent.design as design FROM employe emp LEFT JOIN entreprise ent ON ent.numero=emp.num_entreprise WHERE emp_numero='"+ $scope.edit.numero +"'";
			$cordovaSQLite.execute(db, query, []).then(function(res) {
				if(res.rows.length > 0) {
					$scope.edit.nom = res.rows.item(0).nom;
					$scope.edit.adresse = res.rows.item(0).adresse;
					$scope.edit.taux = res.rows.item(0).taux;
					$scope.edit.design = res.rows.item(0).design;
					$scope.edit.entreprise = res.rows.item(0).ent_numero;
					
				} else {
					console.log("Aucune données !");
				}
			}, function (err) {
				console.error(err);
			});
/*
			/*
		}, 500);
*/
		$scope.editEmploye = function() {
			var query = "UPDATE employe SET nom=?, adresse=?, taux=?, num_entreprise=? WHERE numero=?";
			$cordovaSQLite.execute(db, query, [$scope.edit.nom, $scope.edit.adresse, $scope.edit.taux, $scope.edit.entreprise, $scope.edit.numero]).then(function(res) {
				/*
				console.log("Edited ** "+ $scope.edit.nom);*/

				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Modification de "'+ $scope.edit.nom +'" avec succès.');

				history.back();

			}, function (err) {
				console.error(err.message);
			});

		}
		
	}])
	/* *********************************************************************** */
	/* *************************** ENTREPRISE ******************************** */
	/* *********************************************************************** */
	.controller('entrepriseCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		
		$scope.menu = 'entreprise';
		$scope.entreprises = [];
		var self = this;

		var query = "SELECT numero, design FROM entreprise ORDER BY numero ASC";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
			// console.log(res);
			if(res.rows.length > 0) {
				for(var i=0 ; i<res.rows.length ; i++) {
					$scope.entreprises.push(res.rows.item(i));
					// console.log("SELECTED -> " + res.rows.item(i).numero + " " + res.rows.item(i).design);
				}
			}
			else {
				console.log('Aucune données sélectionnée');
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-warning show').find('p#notif');
				notif.html('Aucune données ENTREPRISE sélectionnée.');
			}
		}, function(err) {
			var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
			notif.html('Erreur lors de la sélection de données ENTREPRISE.<br/>'+err);
			console.log('ERROR');
			console.log(err);
		});

		self.linkEdit = function(pathent) {
			window.location.href = '#/entreprise/'+pathent;
		}

	}])
	.controller('ajoutEntrepriseCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		self = this;

		$("input#numero").focus();

		self.insertEntreprise = function() {
			var query = "INSERT INTO entreprise VALUES (?, ?)";
			$cordovaSQLite.execute(db, query, [$scope.add.numero, $scope.add.design]).then(function(res) {
				/*
				console.log("insertId: " + res.insertId);*/
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Ajout de "'+ $scope.add.design +'" avec succès.');
				window.location.href = "#/entreprise";

			}, function (err) {
				$("input#numero").focus();
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur : Duplication du numero.');
				$('div.form-group:first').addClass('has-error');
			});
			
		}
		
	}])
	.controller('supprimerEntrepriseCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		var entreprise = [];

		$scope.load = function(d_entreprise, event) {
			entreprise = d_entreprise;
			event.preventDefault();
		}

		$scope.deleteEntreprise = function() {

			var query = "DELETE FROM entreprise WHERE numero=?";
			// console.log(entreprise);
			$cordovaSQLite.execute(db, query, [entreprise.numero]).then(function(res) {
				
				var index = $scope.entreprises.indexOf(entreprise);
				$scope.entreprises.splice(index, 1);
				
				// console.log("DELETED XX " + entreprise.numero + " " + entreprise.nom);
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Suppression de "'+ entreprise.design +'" avec succès.');

				//$('div.alert').removeClass('show');

			}, function (err) {
				console.error(err);
			});
			
		}
		
	}])
	.controller('modifierEntrepriseCtrl', ['$scope', '$cordovaSQLite', '$routeParams', function($scope, $cordovaSQLite, $routeParams){
		
		$('input#design').focus();

		$scope.edit = [];
		$scope.edit.numero = $routeParams.entNum;

		var query = "SELECT numero, design FROM entreprise WHERE numero='"+ $scope.edit.numero +"'";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
			if(res.rows.length > 0) {
				$scope.edit.design = res.rows.item(0).design;
				
			} else {
				console.log("Aucune données !");
			}
		}, function (err) {
			console.error(err);
		});
		
		$scope.editEntreprise = function() {
			var query = "UPDATE entreprise SET design=? WHERE numero=?";
			$cordovaSQLite.execute(db, query, [$scope.edit.design, $scope.edit.numero]).then(function(res) {
				/*
				console.log("Edited ** "+ $scope.edit.design);*/

				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Modification de "'+ $scope.edit.design +'" avec succès.');

				window.location.href = "#/entreprise";
			}, function (err) {
				console.error(err.message);
			});

		}
		
	}])
	/* *********************************************************************** */
	/* *************************** TRAVAIL ******************************** */
	/* *********************************************************************** */
	.controller('ajoutTravailCtrl', ['$scope', '$cordovaSQLite', '$routeParams', function($scope, $cordovaSQLite, $routeParams){
		var self = this;
		$scope.trav_add = [];
		$scope.trav_add.num_employe = $routeParams.empNum;

		$('input#nbheures').focus();

		self.insertTravail = function() {
			var query = "INSERT INTO travail VALUES (?, ?)";
			$cordovaSQLite.execute(db, query, [$scope.trav_add.num_employe, $scope.trav_add.nbheures]).then(function(res) {
				/*
				console.log("insertId: " + res.insertId);*/
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Ajout de "'+ $scope.trav_add.nbheures +'" heures de travail avec succès.');
				window.location.href = "#/employeInfo/"+ $scope.trav_add.num_employe;

			}, function (err) {
				$("input#numero").focus();
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
				notif.html('Erreur : Duplication du numero.');
				$('div.form-group:first').addClass('has-error');
			});
			
		}

	}])
	.controller('travailCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		
		$scope.menu = 'travail';
		$scope.travail = [];
		$scope.travail.somme = 0;
		var self = this;

		var query = "SELECT rowid, nbheures FROM travail WHERE num_employe=?";
		$cordovaSQLite.execute(db, query, [$scope.info.numero]).then(function(res) {
			// console.log(res);
			if(res.rows.length > 0) {
				for(var i=0 ; i<res.rows.length ; i++) {
					$scope.travail.push(res.rows.item(i));
					$scope.travail.somme += res.rows.item(i).nbheures;
					// console.log("SELECTED -> " + res.rows.item(i).numero + " " + res.rows.item(i).design);
				}
			}
			else {
				console.log('Aucune données sélectionnée');
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-warning show').find('p#notif');
				notif.html('Aucune donnée TRAVAIL sélectionnée.');
			}
		}, function(err) {
			var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-danger show').find('p#notif');
			notif.html('Erreur lors de la sélection de données TRAVAIL.<br/>'+err);
			console.log('ERROR');
			console.log(err);
		});

		self.linkEdit = function(pathent, rowid) {
			window.location.href = '#/travail/'+pathent+'?id='+rowid;
		}

	}])
	.controller('modifierTravailCtrl', ['$scope', '$cordovaSQLite', '$routeParams', function($scope, $cordovaSQLite, $routeParams){
		$scope.trav_edit = [];

		$scope.trav_edit.num_employe = $routeParams.empNum;
		$scope.trav_edit.id = $routeParams.id;

		$('input#nbheures').focus();
		
		var query = "SELECT nbheures FROM travail WHERE num_employe=? AND rowid=?";
		$cordovaSQLite.execute(db, query, [$scope.trav_edit.num_employe, $scope.trav_edit.id]).then(function(res) {
			if(res.rows.length > 0) {
				$scope.trav_edit.nbheures = res.rows.item(0).nbheures;
				
			} else {
				console.log("Aucune données !");
			}

		}, function (err) {
			$("input#numero").focus();
			console.log("ERROR on select TRAVAIL");
		});

		$scope.editTravail = function() {
			var query = "UPDATE travail SET nbheures=? WHERE num_employe=? AND rowid=?";
			$cordovaSQLite.execute(db, query, [$scope.trav_edit.nbheures, $scope.trav_edit.num_employe, $scope.trav_edit.id]).then(function(res) {

				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Modification avec succès.');

				window.location.href = "#/employeInfo/"+ $scope.trav_edit.num_employe;
			}, function (err) {
				console.error(err.message);
			});

		}

	}])
	.controller('supprimerTravailCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite){
		var travail = [];

		$scope.load = function(d_travail, event) {
			travail = d_travail;
			event.preventDefault();
		}

		$scope.deleteTravail = function() {

			var query = "DELETE FROM travail WHERE rowid=?";
			$cordovaSQLite.execute(db, query, [travail.rowid]).then(function(res) {
				var index = $scope.travail.indexOf(travail);
				$scope.travail.splice(index, 1);
				$scope.travail.somme -= travail.nbheures;
				
				var notif = $('div.alert').removeClass().addClass('alert alert-dismissible alert-success show').find('p#notif');
				notif.html('Suppression du travail avec succès.');

			}, function (err) {
				console.error(err);
			});
			
		}
		
	}])
	;

	
	function onDeviceReady() {
		
	};
	

