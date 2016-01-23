//app/startup.js

//indexeddb initialization

//TEST does db need to be global to avoid scope issue?
var db;
var request = indexedDB.open("RecipeDatabase");
request.onerror = function(event) {
	alert("Database error: " + event.target.errorCode);
};
request.onsuccess = function(event) {
	db = event.target.result;
	//console.log('RecipeDatabase created');
};