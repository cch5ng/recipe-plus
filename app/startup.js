//app/Startup.js
'use strict';

const dbName = 'RecipeDB';

var Startup = {
	initializeDb: function() {
		let db, objectStore, recipeAr = [];
		let request = indexedDB.open(dbName);
		request.onerror = function(event) {
			alert("Database error: " + event.target.errorCode);
		};

		request.onupgradeneeded = function(event) {
		//try make db global so it can be accessed from MModal
			db = event.target.result;

			// Create an objectStore to hold information about our customers. We're
			// going to use "ssn" as our key path because it's guaranteed to be
			// unique - or at least that's what I was told during the kickoff meeting.
			objectStore = db.createObjectStore('recipes', { autoIncrement: true });

			// Create an index to search customers by name. We may have duplicates
			// so we can't use a unique index.
			objectStore.createIndex("name", "name", { unique: false });

			objectStore.add({name: 'cookie', ingredients: ['eggs', 'milk', 'vegetable oil', 'flour', 'salt', 'chocolate chips']});
		};
	},

	getRecipes: function(cb) {
		let db, objectStore, recipeAr = [];
		let request = indexedDB.open(dbName);
		request.onerror = function(event) {
			alert("Database error: " + event.target.errorCode);
		};

		request.onsuccess = function(event) {
		//try make db global so it can be accessed from MModal
			db = event.target.result;

			var transaction = db.transaction(['recipes']);
			objectStore = transaction.objectStore('recipes');
			objectStore.openCursor().onsuccess = function(event) {
				//console.log('got to getNames');
				var cursor = event.target.result;
				if (cursor) {
					//console.log('cursor.value: ' + cursor.value);
					recipeAr.push(cursor.value);
					console.log('name: ' + cursor.value.name);
					cursor.continue();
				} else {
					console.log('got all recipes');
					if (cb) {
						cb();
					}
					console.log('before return length recipeAr: ' + recipeAr.length);
					return recipeAr;
				}
			};
		};
	},

	// getIngredients: function(name) {
		
	// }

};


//TEST run indexeddb initialization code in an IIFE so it is available when the recipes must be rendered
//(function() {
	//TEST: try moving logic for indexeddb into this component; although I don't exactly think this is right
	//making db global so it can be accessed from the jsx
//TEST making vars db, objectStore and recipeAr global so they could be accessed from App.jsx
	// var db;
	// var objectStore;
	// var recipeAr = [];


	//opening db for query of recipes
	// function getRecipes(cb) {

	// }

// 	getRecipes();
// 	console.log('from iife length recipeAr: ' + recipeAr.length);
// }());

Startup.initializeDb();

module.exports = Startup;