//app/components/App.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import '../startup.js';
import Recipes from './Recipes.jsx';
import Nav from './Nav.jsx';
import uuid from 'node-uuid';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {Link} from 'react-router';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		let namesAr = [];
		var recipes = [];

		namesAr = this.getNames();
		console.log('namesAr: ' + namesAr);
		console.log('length namesAr: ' + namesAr.length);


		// this.forEachKey(this.populateNamesAr);
		// //setTimeoutInterval(() => {
		// 	this.namesAr.forEach(name => {
		// 		let mrecipe = {};
		// 		mrecipe.name = name;
		// 		mrecipe.id = uuid.v4();
		// 		recipes.push(mrecipe);
		// 	});
		//}, 500);
		// if (namesAr.length === localStorage.length) {
		// 	this.setState({namesAr: this.namesAr});
		// }
		this.state = {
			recipes: recipes,
			namesAr: namesAr,
			show: false,
			nameValid: 'success'
		}
	}

	render() {
		let recipes = this.state.recipes;
		return (
			<div className="container-fluid" >
				<Nav />
				<Recipes recipes={recipes} namesAr={this.state.namesAr} onDelete={this.deleteRecipe} />
				<Link to='/add'><Button bsStyle="default"> {/* onClick={() => this.setState({ show: true})} */}
					Add Recipe
				</Button></Link>

				{this.props.children}

			</div>
		);
	}

	/**
	 * Adds recipe to local storage and to state
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	addRecipe = (event) => {
		if (this.state.nameValid === 'success') {
			event.preventDefault();

	//parsing the ingredients, cleaning up the format so it will display cleanly later on
			let name = document.getElementById('recipeName').value;
			console.log('name: ' + name);
			var ingredientsStr = document.getElementById('recipeIngredients').value;
			var ingredientsAr = ingredientsStr.split(',');
		//stores final array of ingredients strings, trimmed
			var ingredientsTrim = [];
			ingredientsAr.forEach(function(item) {
				var itemCopy = item.slice(0).trim();
				ingredientsTrim.push(itemCopy);
			});
			//making the ingredients list in localStorage comma delimited but no space
			var ingredientsStrClean = ingredientsTrim.join(',');

	//updating localStorage
			localStorage.setItem(name, ingredientsStrClean);

			let form = document.getElementById('recipeForm');
			form.reset();

			let curRecipes = this.state.recipes;
			let recipeObj = {};
			recipeObj.id = uuid.v4();
			recipeObj.name = name;
			curRecipes.push(recipeObj);
			this.setState({recipes: curRecipes});
			//console.log('typeof recipes from addRecipes: ' + typeof this.state.recipes);
			//console.log('recipes length: ' + this.state.recipes.length);
		}
	};

	/**
	 * Form validation to ensure that a new name field is unique (key in localStorage)
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	validationState = (event) => {
		let matchCount;
		let curName = event.target.value;
		if (localStorage.getItem(curName)) {
			this.setState({nameValid: 'error'});
		} else {
			this.setState({nameValid: 'success'});
		}
	};

	/**
	 * Deletes a recipe from localStorage and state (recipes array). Triggered from Recipe.jsx button.
	 * @param  {String} id - Recipe id
	 * @return {[type]}    [description]
	 */
	deleteRecipe = (id) => {
		let name;
		let recipes = this.state.recipes;

		recipes.forEach(recipe => {
			if (recipe.id === id) {
				name = recipe.name
			}
		})
		localStorage.removeItem(name);

		//console.log('recipe id to delete: ' + id);
		this.setState({
			recipes: this.state.recipes.filter(recipe => recipe.id !== id)
		})
		//console.log('typeof recipes from deleteRecipe: ' + typeof recipes);
	};

	/**
	 * Gets recipe names from localStorage
	 * @return Array of {String} with list of names
	 */
	getNames = () => {
		//let namesStr = '';
		let namesAr = []
		let namesCount;
		namesCount = localStorage.length;
		//console.log('namesCount: ' + namesCount);
		for (let i = 0; i < namesCount; i++) {
			namesAr.push(localStorage.key(i));
			//(namesCount - 1) prevents extra empty list item at the bottom
			// if (i < namesCount - 1) {
			// 	namesStr += localStorage.key(i) + ',';
			// } else {
			// 	namesStr += localStorage.key(i);
			// }
		}
		console.log('namesAr: ' + namesAr);
		//console.log('storage count: ' + namesCount);
		return namesAr;
	};

	//helper iterate over local storage keys
// 	forEachKey = (callback) => {
// //	function forEachKey(callback) {
// 		let namesArIn = []
// 		for (var i = 0; i < localStorage.length; i++) {
// 			callback(localStorage.key(i));
// 		}
// 	}

// 	populateNamesAr = (item) => {
// 		console.log('item: ' + item);
// 		console.log('namesAr: ' + this.namesAr);
// 		this.namesAr.push(item);
// 	}

}