//app/components/Recipes.jsx

import React from 'react';
import Recipe from './Recipe.jsx';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Input} from 'react-bootstrap';

export default class Recipes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			names : '',
			nameValid: 'success'
		}
	}

//var RecipeList = React.createClass({
	// getInitialState: function() {
	// 	return {names : '', nameValid: 'success'};
	// },

	render() {
		let namesAr2 = [];
		if (this.state.names) {
			//console.log('this.state.names: ' + this.state.names);
			namesAr2 = this.state.names.split(',');
		}

		var recipeNodes = namesAr2.map(function(recipe, i) {
			return (
				<Recipe key={i} data={recipe}  >
					{recipe}
				</Recipe>
			);
		});

		return (
			<div className="recipeList">
				<ul>
					{recipeNodes}
				</ul>
				<Button
					bsStyle="default"
					onClick={() => this.setState({ show: true})}>
						Add Recipe
				</Button>

				<div className="modal-container">
					<Modal
						show={this.state.show}
						onHide={close}
						container={this}
						aria-labelledby="contained-modal-title">

						<Modal.Header>
							<Modal.Title>Add Recipe</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<form id="recipeForm">
								<div className="form-group">
									<Input type="text" 
										label="Name" 
										groupClassName="group-class"
										labelClassName="label-class"
										id="recipeName"
										name="recipeName"
										size="50"
										help="Name must be unique or original ingredients will be lost."
										bsStyle={this.state.nameValid} hasFeedback
										onChange={this.validationState}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="recipe-ingredients">Ingredients</label>
									<input type="text" className="form-control" id="recipeIngredients" name="recipeIngredients" placeholder="enter ingredients separated by commas" size="50" />
								</div>
							</form>
						</Modal.Body>

						<Modal.Footer>
							<Button type="submit" onClick={this.saveRecipe} bsStyle="primary" >Add Recipe</Button>
							<Button bsStyle="default" onClick={() => this.setState({show: false})}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
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