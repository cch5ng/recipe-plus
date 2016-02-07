//app/components/Recipes.jsx

import React from 'react';
import Recipe from './Recipe.jsx';
import uuid from 'node-uuid';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

//({recipes}) =>
//???why does it matter whether you extend React.Component vs export {recipes, onEdit, onDelete}
//is it better to store nameValid as state in App? and bubble up any changes back to App?

export default class Recipes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//names : '',
			nameValid: 'success'
		}
	}

	render() {
		var onDelete = this.props.onDelete;
		//var onAdd = this.props.onAdd;
		var recipes = this.props.recipes;
		console.log('type of recipes in Recipes: ' + typeof recipes);
		// console.log('recipes: ' + recipes);
		// console.log('recipe1: ');
		// console.log('id: ' + recipes[0].id);
		// console.log('name: ' + recipes[0].name);
		// // console.log('recipe2: ');
		// console.log('id: ' + recipes[1].id);
		// console.log('name: ' + recipes[1].name);
		// console.log('recipe3: ');
		// console.log('id: ' + recipes[2].id);
		// console.log('name: ' + recipes[2].name);

		return (
			<div className="recipeList">
				<ul>
					{recipes.map(recipe =>
						<Recipe key={recipe.id} name={recipe.name} onDelete={onDelete.bind(null, recipe.id)} />
					)}
				</ul>

			</div>
		);
	}

	getNames = () => {
		let namesStr = '';
		let namesCount;
		namesCount = localStorage.length;
		//console.log('namesCount: ' + namesCount);
		for (let i = 0; i < namesCount; i++) {
			//(namesCount - 1) prevents extra empty list item at the bottom
			if (i < namesCount - 1) {
				namesStr += localStorage.key(i) + ',';
			} else {
				namesStr += localStorage.key(i);
			}
		}
		console.log('namesStr: ' + namesStr);
		return namesStr;
	};

	getName = () => {
		let curName = document.getElementById('recipeName');
		return curName;
	};

	componentDidMount = () => {
		let namesStr = this.getNames();
		this.setState({names: namesStr});
		this.render();
	};

	getNewName = () => {
		let name = document.getElementById('recipeName').value;
		console.log('new name: ' + name);
		return name;
	};

	saveRecipe = (event) => {
		if (this.state.nameValid === 'success') {
			event.preventDefault();

	//parsing the ingredients, cleaning up the format so it will display cleanly later on
			// console.log('clicked save');
			let existingNames = this.getNames();
			let name = document.getElementById('recipeName').value;
			console.log('name: ' + name);
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
			//making the ingredients list in localStorage comma delimited but no space
			var ingredientsStrClean = ingredientsTrim.join(',');
			//console.log('ingredientsStrClean: ' + ingredientsStrClean);

	//updating localStorage
			localStorage.setItem(name, ingredientsStrClean);
			//console.log('names: ' + this.getNames());

			let namesStr;
			namesStr = existingNames + ',' + name;
			//console.log('save namesStr: ' + namesStr);
			this.setState({names: namesStr});

			let form = document.getElementById('recipeForm');
			form.reset();
		}
	};

	//perform validation to ensure that name field is unique (key in localStorage)
	validationState = (event) => {
		let matchCount;
		let curName = event.target.value;
		if (localStorage.getItem(curName)) {
			this.setState({nameValid: 'error'});
		} else {
			this.setState({nameValid: 'success'});
		}
	};

	handleDelete = (name) => {
		let namesStr;
		namesStr = this.state.names;
		let namesAr = namesStr.split(',');
		let newNamesAr = [];
		let newNamesStr;

		namesAr.forEach(function(mname) {
			if (mname !== name) {
				newNamesAr.push(mname);
			}
		});
		//console.log('newNamesAr: ' + newNamesAr);
		this.setState({names: newNamesStr});
	};

//});
}