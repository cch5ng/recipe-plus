//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import './Modal.jsx';
//import {Table, Column, Cell} from 'fixed-data-table';
//import './startup.js';
var FixedDataTable = require('fixed-data-table');
const {Table, Column, Cell} = FixedDataTable;

var urlRecent = "http://fcctop100.herokuapp.com/api/fccusers/top/recent";
var urlTotal = "http://fcctop100.herokuapp.com/api/fccusers/top/alltime";

//TEST: try moving logic for indexeddb into this component; although I don't exactly think this is right
const dbName = 'RecipeDB';
//making db global so it can be accessed from the jsx
var db;
var objectStore;
var request = indexedDB.open(dbName);
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

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {data:[], url: urlRecent};
	}

	componentDidMount() {

	}


	render() {

		return (
			<div className="container-fluid" >
				<div className="row">
					<nav className="navbar navbar-default">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">Recipe Box</a>
						</div>
					</nav>
				</div>

				<RecipeSection />

				<div className="row footer">
					<div className="col-xs-12 col-sm-12">
						<p className="text-center">Brought to you with <i className="fa fa-heart"></i><br /> 
							from <a href="http://www.carolchung.com" target="_blank">Tusk Tusk Dev.</a><br />
							<a href="https://github.com/cch5ng/fcc-leaderboard" target="_blank">(source)</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};

var RecipeSection = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		//let db;
		var data = [];
		var request = indexedDB.open(dbName);
		request.onerror = function(event) {
			alert("Database error: " + event.target.errorCode);
		};

		request.onsuccess = function(event) {
		//try make db global so it can be accessed from MModal
			db = event.target.result;
			var objectStore = db.transaction('recipes').objectStore('recipes');
			objectStore.openCursor().onsuccess = function(event) {
				console.log('got to getNames');
				var cursor = event.target.result;
				if (cursor) {
					console.log('cursor.value: ' + cursor.value);
					data.push(cursor.value);
					console.log('name: ' + cursor.value.name);
					cursor.continue();
				} else {
					console.log('got all recipes');
				}

				console.log('length data: ' + data.length);
			}
		};

		this.setState({data: data});
		console.log('recipesection data state: ' + this.state.data);

	},

	render: function() {
		return (
			<div>
				<RecipeList data={this.state.data}/>
				<MModal />
			</div>
		);
	}
});

var RecipeList = React.createClass({

	// getNames: function() {
	// 	var data = [];
	// 	//return data;
	// },

	render: function() {
		//this.getNames();
		console.log('props.data: ' + this.props.data);
		var recipeNodes = this.props.data.map(function(recipe) {
			return (
				<Recipe key={recipe.name} data={recipe.name}>
				</Recipe>
			);
		});

		return (
			<div className="recipeList">
				<ul>
				{recipeNodes}
				</ul>
			</div>
			);
	}
});

var Recipe = React.createClass({
  render: function() {
    return (
        <li className="recipe">
          {this.props.data}
	    </li>
    );
  }
});

var MModal = React.createClass({

	getInitialState: function() {
		return { modalIsOpen: false };
	},

	openModal: function() {
		this.setState({modalIsOpen: true});
	},

	closeModal: function(event) {
		//event.preventDefault();
		this.setState({modalIsOpen: false});
	},

	saveRecipe: function(event) {
		event.preventDefault();
		// console.log('clicked save');
		var name = document.getElementById('recipeName').value;
		// console.log('name: ' + name);
		var ingredientsStr = document.getElementById('recipeIngredients').value;
		// console.log('ingredientsStr: ' + ingredientsStr);
		var ingredientsAr = ingredientsStr.split(',');
	//stores final array of ingredients strings, trimmed
		var ingredientsTrim = [];
		// console.log('ingredientsAr: ' + ingredientsAr);
		// console.log('length ingredientsAr: ' + ingredientsAr.length);
		ingredientsAr.forEach(function(item) {
			// console.log('item: ' + item);
			var itemCopy = item.slice(0).trim();
			ingredientsTrim.push(itemCopy);
		});
		console.log('ingredientsTrim: ' + ingredientsTrim);
		console.log('length 0: ' + ingredientsTrim[0].length);
		//console.log('length 1: ' + ingredientsTrim[1].length);

		//writing to indexeddb
		var transaction = db.transaction(["recipes"], "readwrite");
		console.log('got here');

		// Do something when all the data is added to the database.
		transaction.oncomplete = function(event) {
			console.log('db populated');
			//clear form
			var form = document.getElementById('recipeForm');
			form.reset();
		};

		transaction.onerror = function(event) {
			alert("Database error: " + event.target.errorCode);
		};

		var objectStore = transaction.objectStore("recipes");
		var newRecipe = {name: name, ingredients: ingredientsTrim};
		objectStore.add(newRecipe);
		request.onsuccess = function(event) {
			//feeds redundant with oncomplete function
			console.log('db populated');
		};
	},


	//setName: function(event) {
		//var name = event.target.recipeName.value;
		//this.setState({name: name});
	//},

	render: function() {
		return (

				<div>
					<button onClick={this.openModal}>Add Recipe</button>
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						style={customStyles} >
						<p className="h4">Add a recipe <i className="fa fa-times" onClick={this.closeModal}></i></p>
						{/*<button onClick={this.closeModal}>X</button>*/}

						<form id="recipeForm">
							<div className="form-group">
								<label htmlFor="recipe-name">Name</label>
								<input type="text" className="form-control" id="recipeName" name="recipeName" size="50" />
							</div>
							<div className="form-group">
								<label htmlFor="recipe-ingredients">Ingredients</label>
								<input type="text" className="form-control" id="recipeIngredients" name="recipeIngredients" placeholder="enter ingredients separated by commas" size="50" />
							</div>
							<button type="submit" onClick={this.saveRecipe} className="btn btn-primary">Add Recipe</button> <button className="btn btn-default" onClick={this.closeModal}>Close</button>
						</form>
					</Modal>
				</div>
		);
	}
});

var RecipieList = React.createClass({


	render: function() {

	}
});
