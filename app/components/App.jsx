//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Collapse from 'rc-collapse';
//rc-collapse css
import './index.css';
import '../startup.js';
//import '../startup.js';
var Panel = Collapse.Panel;
//import {Table, Column, Cell} from 'fixed-data-table';
//import './startup.js';
// var FixedDataTable = require('fixed-data-table');
// const {Table, Column, Cell} = FixedDataTable;
// const pollInterval = 10000;

//TEST access to Startup functions
//console.log('Startup.getRecipes(): ' + Startup.getRecipes());

export default class App extends React.Component {
	constructor() {
		super();
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
	getNames: function() {
		return Startup.getRecipes();
	},

	render: function() {
		//var accordion = this.state.accordion;
		return (
			<div>
				<RecipeList /> {/* data={this.getNames() data={this.state.data} */}
				<MModalAdd />
{/* TODO recipe edit modal */}
				{/*<MModalEdit />*/}
			</div>
		);
	}
});

var RecipeList = React.createClass({
	setNamesState: function(namesAr) {
		this.setState({names: namesAr});
	},

	getNames: function() {
		let namesStr;
		let namesCount;
		namesCount = localStorage.length;
		console.log('namesCount: ' + namesCount);
		for (let i = 0; i < namesCount; i++) {
			if (i < namesCount - 1) {
				namesStr += localStorage.key(i) + ',';
			} else {
				namesStr += localStorage.key(i);
			}
		}
		console.log('namesStr: ' + namesStr);
		this.setState({names: namesStr});
	},

	getInitialState: function() {
		return {names : []}; //data: Startup.getRecipes()
	},

	componentDidMount: function() {
		this.getNames();
		this.render();
	},

	render: function() {
		let namesAr = [];
		console.log('this.state.names: ' + this.state.names);
		namesAr = this.state.names.split(',');
		console.log('namesAr: ' + namesAr);

		var recipeNodes = namesAr.map(function(recipe) {
			return (
				<Recipe key={recipe} data={recipe}>
					{recipe}
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
		//console.log('Recipe props.data: ' + this.props.data);
		return (
			<div className="recipe">
				{this.props.data}
				<IngredientsList data={this.props.data}/>
			</div>
		);
	}
});

var IngredientsList = React.createClass({
	render: function() {
		let ingredientsAr = [];
		let ingredientsStr;
		console.log('this.props.data: ' + this.props.data);
		ingredientsStr = localStorage.getItem(this.props.data);
		console.log('ingredientsStr: ' + ingredientsStr);
		if (ingredientsStr) {
			ingredientsAr = ingredientsStr.split(', ');
		}
		// console.log('length ingredientsAr: ' + ingredientsAr.length);
		var ingredientNodes = ingredientsAr.map(function(ingred) {
			return (
				<li className="ingredient">
					{ingred}
				</li>
			);
		});

		return (
			<div className="ingredientList">
				<ul>
					{ingredientNodes}
				</ul>
			</div>
		);
	}
});

var MModalAdd = React.createClass({

	getRecipes: function() {
		// const dbName = 'RecipeDB';
		// let db, objectStore, recipeAr = [];
		// let request = indexedDB.open(dbName);
		// let namesAr = [];
		// request.onerror = function(event) {
		// 	alert("Database error: " + event.target.errorCode);
		// };

		// request.onsuccess = function(event) {
		// //try make db global so it can be accessed from MModal
		// 	db = event.target.result;
		// 	var transaction = db.transaction(['recipes']);
		// 	objectStore = transaction.objectStore('recipes');
		// 	objectStore.openCursor().onsuccess = function(event) {
		// 		var cursor = event.target.result;
		// 		if (cursor) {
		// 			namesAr.push(cursor.value.name);
		// 			cursor.continue();
		// 		} else {
		// 			console.log('got all recipes');

		// 			return namesAr;
		// 		}
		// 	};
		// };
	},

	getInitialState: function() {
		return { modalIsOpen: false, names: []};
	},

	componentDidMount: function() {
		let namesAr = [];
		this.setState({names: namesAr});
		// console.log('names: ' + this.state.names);
	},

	openModal: function() {
		this.setState({modalIsOpen: true});
	},

	closeModal: function(event) {
		event.preventDefault();
		this.setState({modalIsOpen: false});
	},

	saveRecipe: function(event) {
		event.preventDefault();

//parsing the ingredients
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
		//console.log('ingredientsTrim: ' + ingredientsTrim);
		//console.log('length 0: ' + ingredientsTrim[0].length);
		//console.log('length 1: ' + ingredientsTrim[1].length);

		// const dbName = 'RecipeDB';
		// let db, objectStore, recipeAr = [];
		// let request = indexedDB.open(dbName);
		// request.onerror = function(event) {
		// 	alert("Database error: " + event.target.errorCode);
		// };

		// request.onsuccess = function(event) {
		// //try make db global so it can be accessed from MModal
		// 	db = event.target.result;

		// 	//writing to indexeddb
		// 	var transaction = db.transaction(["recipes"], "readwrite");

		// 	// Do something when all the data is added to the database.
		// 	transaction.oncomplete = function(event) {
		// 		//console.log('db populated');
		// 		var form = document.getElementById('recipeForm');
		// 		form.reset();
		// 	};

		// 	transaction.onerror = function(event) {
		// 		alert("Database error: " + event.target.errorCode);
		// 	};

		// 	var objectStore = transaction.objectStore("recipes");
		// 	var newRecipe = {name: name, ingredients: ingredientsTrim};
		// 	objectStore.add(newRecipe);

		// };

//TODO here should also reset the session data var so all latest recipes display
		let namesAr = [];
		//this.state.names;
		namesAr.push(name);
		this.setState({names: namesAr});
		// getRecipes(function() {
		// 	MModal.setState({data: recipeAr})
		// });

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
